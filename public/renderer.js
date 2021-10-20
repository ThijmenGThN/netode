const { ipcRenderer } = require("electron")

setTimeout(() => ipcRenderer.send("ping-out", "ping"), 2500)

ipcRenderer.on("ping-in", (event, arg) => {
    alert(arg)
})
