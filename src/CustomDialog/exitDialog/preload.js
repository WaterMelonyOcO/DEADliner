const { contextBridge, ipcRenderer } = require("electron");



contextBridge.exposeInMainWorld("api", {
    send: (num) => {ipcRenderer.send("MessageData", num)}
})