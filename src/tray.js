const { Tray, Menu, nativeImage, BrowserWindow } = require("electron");
const handlers = require("./handlers");
const { resolve } = require("path");
const { paths } = require('./paths')
const { openDialog } = require("electron-custom-dialog")


class MTray extends Tray {
    constructor(win, app, icon = nativeImage.createFromPath(paths.trayIcon)) {
        super(icon)
        console.log(paths.trayIcon);
        const ContextMenu = Menu.buildFromTemplate([
            { label: "Выход", type: "normal", click:  () => { openDialog("myDialog", {question:"ldkf"}).then((result)=>{console.log(result);}) }},
            { label: "Добавить задание", type: "normal", click:(ev)=>{  this.#addNewTask()}}
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