const { BrowserWindow } = require("electron");
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
                preload: resolve(__dirname,"dialogs","preloader.js")
            }
        })
    }
    static showMessage(
        parent = null,
        title = 'exemple title',
        desc = "some description",
        interfacePath = join(__dirname,'dialogs','ShowMessageDialog.html'),
        button = []) {

        const dial = new CustomDialog(parent, title, desc);

        dial.loadFile(interfacePath);
        // dial.on("show", (ev, num)=>{
        //     console.log(num);
        //     return num
        // })
    }
}

module.exports.CustomDialog = CustomDialog