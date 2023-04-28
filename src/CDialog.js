const { BrowserWindow } = require("electron");
const { readFile } = require("fs");
const { join } = require("path")

class CustomDialog extends BrowserWindow {

    constructor(parent = null, title = 'exemple title', desc = "some description") {
        super({
            title: title,
            modal: true,
            parent: parent,
            alwaysOnTop: true,
            center: true,
            autoHideMenuBar: true,
            fullscreenable: false,
            webPreferences:{
                nodeIntegration: true,
                devTools: true,
                webSecurity: false
            }
        })
    }
    static showMessage(
        parent,
        title = 'exemple title',
        desc = "some description",
        interfacePath = join(__dirname, '..', 'public', 'dialog.html'),
        button = []) {

        const dial = new CustomDialog(parent, title, desc);

        dial.loadFile(interfacePath);
        dial.on("show", ()=>{
            console.log("a");
        })
        return dial
    }
}

module.exports.CustomDialog = CustomDialog