const { BrowserWindow, ipcMain } = require("electron");

const { join, resolve } = require("path")

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
     * @param opt
     * @type {{button: Array, title: String, desc:String, callback:function, interfacePath:String|path}}
     * @returns {Number}
     * 
     * @description
     * возвращает значение нажатой кнопки
     */

    static showMessage(opt, callback) {

        let button = opt.button || [],
        desc = opt.desc || "some description",
        title = opt.title || 'exemple title',
        interfacePath = opt.interfacePath || join(__dirname, 'dialogs', "ShowMessageDialog",'ShowMessageDialog.html'),
        width = opt.width || 250,
        height = opt.height || 100

        const dial = new CustomDialog(null, { title, desc, width, height, interfacePath });

        dial.webContents.send("dialog::Show::Button", button, desc)

        // .then((data)=>{ipcMain.handle("show",(ev, da)=>{console.log(da);})})

        ipcMain.on("dialog::Send", (ev, data) => {
            callback( data );
            dial.destroy()
        });
    }

    /**
     * @param {String} title 
     * @param {String} desc 
     * @param {String|path} interfacePath 
     * @param opt
     * @type {{title: String, desc:String, interfacePath:String|path}}
     */
    static showError(opt) {
        let title = opt.title || "some err title",
        desc = opt.desc || "it's some description",
        interfacePath = opt.interfacePath || join(__dirname, 'dialogs', "ErrorDialog",'ErrorDialog.html')

        const dial = new CustomDialog(null, { title, desc, interfacePath })
        dial.webContents.send("dialog::Show::Error", desc)

        return ipcMain.on("dialog::Send::Error", (ev) => {
            dial.destroy()
        });
    }
}

module.exports.CustomDialog = CustomDialog