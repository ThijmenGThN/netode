// -> Imports
const { app, BrowserWindow, ipcMain } = require("electron")
const isDev = require("electron-is-dev")
const path = require("path")

require("@electron/remote/main").initialize()

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
        icon: __dirname + "./../assets/favicon.ico",

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

    // -> IPC
    ipcMain.on("exit", () => app.exit(0))
    ipcMain.on("minimize", () => win.minimize())
}

// -> Listeners
app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow
})
