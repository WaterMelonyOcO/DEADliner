const { Tray, Menu, nativeImage, BrowserWindow, ipcRenderer } = require("electron");
const handlers = require("./handlers");
const { resolve } = require("path");
const { paths } = require('./paths')


class MTray extends Tray {
    constructor(win, app, icon = nativeImage.createFromPath(paths.trayIcon)) {
        super(icon)
        console.log(paths.trayIcon);
        const ContextMenu = Menu.buildFromTemplate([
<<<<<<< HEAD:src/tray.js
            { label: "Выход", type: "normal", click: async () => { await handlers.exit().then((data)=>{ if (!data) app.exit(0)}) } },
            { label: "Добавить задание", type: "normal", click:(ev)=>{  this.#addNewTask()}}
=======
            { label: "Выход", type: "normal", click: ()=>{win.webContents.send("exitHandler")} },
            { label: "Добавить задание", type: "normal", click:(ev)=>{ win.webContents.send("addTaskHandler:Tray")}}
>>>>>>> Notafication:public/backend/tray.js
        ])
        // this.#addNsewTask()
        this.setToolTip("DEADliner");
        this.setTitle("DEADliner");
        this.setContextMenu(ContextMenu);

        this.on("click", () => {
            if (!win?.isVisible()) win.show();
        })
    }

    #addNewTask(){
        // window.openFile(resolve('../',"public","addNewTask.html"))
        const win = new BrowserWindow({
            width: 500,
            height: 600,
            webPreferences:{
                nodeIntegration: true,
                preload: resolve(__dirname,'trayPreload.js')
            }
        })
        // win.

        win.loadFile(resolve(__dirname,'..',"public","addNewTask.html"))
    }
}

module.exports.MTray = MTray;