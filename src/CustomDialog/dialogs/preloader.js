const { contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld("MyDialog",{
    send: (num)=>{ipcRenderer.invoke("dialog::Show", num)},
    getBtn: (cb)=>{ipcRenderer.on("dialog::Show::Button", (ev, ...arg)=>{cb(...arg)})}
})
