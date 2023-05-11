const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("loader", {
    addTask: (askName, deadline, description , files) => {ipcRenderer.send("trayTask", askName, deadline, description , files)}
    // addTask: (...arg)=>{console.log(arg);}
})