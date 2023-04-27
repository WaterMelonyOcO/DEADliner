const { Tray, Menu, nativeImage, BrowserWindow } = require("electron");
const handlers = require("./handlers");
const { resolve } = require("path");


class MTray extends Tray {
    constructor(win, app, icon = nativeImage.createEmpty()) {
        super(icon)

        //tray. На linux kde не работает. доделать
        //сделать иконку
        // const icon = nativeImage.createFromPath(paths.trayIcon);
        const ContextMenu = Menu.buildFromTemplate([
            { label: "Выход", type: "normal", click: () => { if (handlers.exit()) app.exit(0) } },
            { label: "Добавить задание", type: "normal", click:(ev)=>{  this.#addNewTask()}}
        ])
        this.#addNewTask()

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