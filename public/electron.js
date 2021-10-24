// -> Imports
const { app, BrowserWindow, ipcMain } = require("electron")
const { download } = require("electron-dl")
const { spawn } = require("child_process")
const isDev = require("electron-is-dev")
const root = require("app-root-path")
const { rmSync, existsSync } = require("fs")
const axios = require("axios")
const path = require("path")

require("@electron/remote/main").initialize()
if (existsSync(root + "/dist/update"))
    rmSync(root + "/dist/update", { recursive: true })

const developer = false

// -> Application
function createWindow() {
    const win = new BrowserWindow({
        width: 250,
        minWidth: 250,
        maxWidth: 250,

        height: 400,
        minHeight: 400,
        maxHeight: 400,

        show: false,
        frame: false,
        transparent: true,
        icon: __dirname + "./favicon.ico",

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    if (app.requestSingleInstanceLock()) {
        app.on("second-instance", () => {
            if (win) {
                if (win.isMinimized()) win.restore()
                win.focus()
            }
        })

        win.loadURL(
            isDev
                ? "http://localhost:3000"
                : `file://${path.join(__dirname, "../build/index.html")}`
        )

        win.webContents.on("did-finish-load", () => win.show())
    } else app.quit()

    // -> Updater
    let update = {},
        lastUpdateChecked = 1
    const fetchUpdate = (event) => {
        // rate limiter
        if (Math.floor((Date.now() - lastUpdateChecked) / 1000) > 60)
            axios
                .get(
                    !developer
                        ? "https://api.github.com/repos/ThijmenGThN/netode/releases/latest"
                        : "https://google.com/"
                )
                .then(({ data }) => {
                    if (developer)
                        data = {
                            html_url:
                                "https://github.com/ThijmenGThN/netode/releases/tag/1.1.0",
                            tag_name: "1.1.0",
                            assets: [
                                {
                                    url: "https://api.github.com/repos/ThijmenGThN/netode/releases/assets/47718534",
                                    name: "netode-1.1.0.exe",
                                    browser_download_url:
                                        "https://github.com/ThijmenGThN/netode/releases/download/1.1.0/netode-1.1.0.exe",
                                },
                            ],
                            body: "Test Description",
                        }
                    else lastUpdateChecked = Date.now()

                    try {
                        if (
                            data.assets[0].name != `netode-${data.tag_name}.exe`
                        ) {
                            update = {
                                failed: true,
                                notice: "unable to fetch update details right now.",
                            }
                            return event.reply("fromMain-FetchUpdate", update)
                        }

                        if (data.draft) {
                            update = {
                                failed: true,
                                notice: "updating is currently halted, <a target='_blank' href='https://google.com/'>view status</a>.",
                            }
                            return event.reply("fromMain-FetchUpdate", update)
                        }

                        if (data.tag_name == app.getVersion()) {
                            update = {
                                failed: true,
                                notice: "seems like you're up-to date, wonderful.",
                            }
                            return event.reply("fromMain-FetchUpdate", update)
                        }

                        update = {
                            failed: false,
                            notice: "an update is available, let's install it.",
                            download: data.assets[0].browser_download_url,
                            changelog: data.body,
                            origin: data.html_url,
                            version: data.tag_name,
                        }
                        event.reply("fromMain-FetchUpdate", update)
                    } catch (err) {
                        update = {
                            failed: true,
                            notice: "unable to fetch update details right now.",
                        }
                        event.reply("fromMain-FetchUpdate", update)
                    }
                })
        else {
            update = {
                failed: true,
                notice: `rate limited, let's retry that in ${
                    60 - Math.floor((Date.now() - lastUpdateChecked) / 1000)
                }s.`,
            }
            event.reply("fromMain-FetchUpdate", update)
        }
    }

    // -> IPC
    ipcMain.on("exit", () => app.exit(0))
    ipcMain.on("minimize", () => win.minimize())

    ipcMain.on("toMain-Splash", (event) => {
        event.reply("fromMain-Version", app.getVersion())
        setTimeout(() => fetchUpdate(event), 2500)

        if (developer) event.reply("alert", "DEVELOPER")
    })

    let isBusy
    ipcMain.on("toMain-Update", (event) => {
        try {
            if (isBusy) return

            if (
                update == {} ||
                update.failed == undefined ||
                update.failed == true
            ) {
                event.reply("alert", "Unable to update, try again later.")
                return
            }

            isBusy = true

            event.reply("fromMain-Update", {
                state: "starting",
                notice: "cleaning up for installation.",
                percent: 0,
            })

            if (existsSync(root + "/dist/update"))
                rmSync(root + "/dist/update", { recursive: true })

            setTimeout(() => {
                download(win, update.download, {
                    directory: root + "/dist/update",
                    filename: "setup.exe",
                    onProgress: ({ percent }) => {
                        event.reply("fromMain-Update", {
                            state: "downloading",
                            notice: "downloading required update files.",
                            percent,
                        })
                    },
                }).then(() => {
                    event.reply("fromMain-Update", {
                        state: "installing",
                        notice: "update being processed, almost there.",
                    })

                    setTimeout(() => {
                        spawn(
                            "cmd.exe",
                            [
                                `/C taskkill /F /PID ${process.pid} & start ${root}/dist/update/setup.exe`,
                            ],
                            { detached: true }
                        )
                    }, 5000)
                })
            }, 2500)
        } catch (err) {
            isBusy = false

            return event.reply(
                "alert",
                "Unable to update, try again later.\n\n" + err
            )
        }
    })
}

// -> Listeners
app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow
})
