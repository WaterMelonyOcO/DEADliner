const { BrowserWindow, ipcMain, ipcRenderer, webContents } = require("electron");
const Renderer = require("electron/renderer");
const { readFile } = require("fs");
const { join, normalize, resolve } = require("path")

/**
 * @description
 * only main calls
 */
class CustomDialog extends BrowserWindow {

    /**
     * @constructor
     * @param {BrowserWindow} parent
     * @param {object} opt
     * @type  {title:String, desk:String, width:Number, height:Number, interfacePath:String||path}
     */
    constructor(parent = null, opt) {
        super({
            title: opt.title || "exemple title",
            modal: true,
            // parent: parent,
            alwaysOnTop: true,
            center: true,
            autoHideMenuBar: true,
            fullscreenable: false,
            webPreferences: {
                nodeIntegration: true,
                devTools: true,
                webSecurity: false,
                preload: resolve(__dirname, "dialogs", "preloader.js"),

            },
            width: opt.width || 250,
            height: opt.height || 150
        })

        this.interfacePath = opt.interfacePath || join(__dirname, 'dialogs', 'TestDialog.html')

        this.loadFile(this.interfacePath)
    }

    /**
     * 
     * @param {Array} button 
     * @param {function} callback 
     * @param {String} title 
     * @param {String} desc 
     * @param {String|path} interfacePath 
     * @returns {Number}
     * 
     * @description
     * возвращает значение нажатой кнопки
     */

    static showMessage(
        button = [],
        desc = "some description",
        callback,
        title = 'exemple title',
        interfacePath = join(__dirname, 'dialogs', "ShowMessageDialog",'ShowMessageDialog.html')) {

        const dial = new CustomDialog(null, { title: title, desc: desc, width: 250, height: 100, interfacePath });

        dial.webContents.send("dialog::Show::Button", button, desc)

        // .then((data)=>{ipcMain.handle("show",(ev, da)=>{console.log(da);})})

        return ipcMain.handle("dialog::Show", (ev, data) => {
            callback(data);
            dial.destroy()
        });
    }

    /**
     * 
     * @param {String} desc 
     * @param {String} title 
     * @param {String|path} interfacePath 
     */
    static showError(
        desc = "some description",
        title = 'exemple title',
        interfacePath = join(__dirname, 'dialogs', "ErrorDialog",'ErrorDialog.html')) {

        const dial = new CustomDialog(null, { title, desc, interfacePath })
        // dial.webContents.on("dialog::Show::Error",()=>{
        //     dial.destroy();
        // })

        return ipcMain.handle("dialog::Show::Error", (ev) => {
            dial.destroy()
        });
    }
}

module.exports.CustomDialog = CustomDialog