const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", ()=>{
    send: (chanel, ...args) => ipcRenderer.send(chanel, ...args)
})