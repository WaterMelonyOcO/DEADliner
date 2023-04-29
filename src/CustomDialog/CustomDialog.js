const { BrowserWindow, ipcMain, ipcRenderer, webContents } = require("electron");
const Renderer = require("electron/renderer");
const { readFile } = require("fs");
const { join, normalize, resolve } = require("path")

class CustomDialog extends BrowserWindow {

    constructor(parent = null, title = 'exemple title', desc = "some description") {
        super({
            title: title,
            modal: true,
            // parent: parent,
            alwaysOnTop: true,
            center: true,
            autoHideMenuBar: true,
            fullscreenable: false,
            webPreferences:{
                nodeIntegration: true,
                devTools: true,
                webSecurity: false,
                preload: resolve(__dirname,"dialogs","preloader.js"),

            }
        })  
        this.loadFile(join(__dirname,'dialogs','ShowMessageDialog.html'))
    }

    /**
     * 
     * @param {Array} button 
     * @param {function} callback 
     * @param {String} title 
     * @param {String} desc 
     * @param {String} interfacePath 
     * 
     * @description
     * возвращает callback передаваетмый в ipcMain.handle
     * в rendere посылает кнопки через канал "dialog::Show::Button"
     */
    
    static showMessage(
        button = [],
        desc = "some description",
        callback,
        title = 'exemple title',
        interfacePath = join(__dirname,'dialogs','ShowMessageDialog.html')) {

        const dial = new CustomDialog(title, desc);

        dial.loadFile(interfacePath)
        dial.webContents.send("dialog::Show::Button", button, desc)
        
        // .then((data)=>{ipcMain.handle("show",(ev, da)=>{console.log(da);})})

        return ipcMain.handle("dialog::Show", (ev, data)=>{callback(data)});
    }
}

module.exports.CustomDialog = CustomDialog