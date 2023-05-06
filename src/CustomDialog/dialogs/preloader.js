const { contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld("MyDialog",{
    send: (num)=>{ipcRenderer.send("dialog::Send", num)},
    getBtn: (cb)=>{
        ipcRenderer.on("dialog::Show::Button", (ev, ...arg)=>{cb(...arg)})
    },
    getDesc: (cb)=>{ipcRenderer.on("dialog::Show::Error", (ev, txt)=>cb(txt))},
    ErrorWindow: ()=>{ipcRenderer.sendSync("dialog::Send::Error")}
})
