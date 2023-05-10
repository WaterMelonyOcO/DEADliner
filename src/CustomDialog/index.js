
const { ipcMain, BrowserWindow } = require("electron")

class CustomDialog {
    constructor(load, preload) {
        return new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                preload: preload,
                webSecurity: false,
                devTools: true,
            }
        })
    }

    static showErrorDialog(app, load, preload) {
        const win = new CustomDialog(load, preload)
        win.loadFile(load)

        ipcMain.on('submit', (_, data) => {
            console.log(data);
            if (data){
                win.destroy()
            }
        });
    }

    static rewriteDialog(){

    }

    static showMessageDialog(load, preload, callback){
        const win = new CustomDialog(load, preload)
        win.loadFile(load)

        ipcMain.on('MessageData', (_, data) => {
            return callback(data)
        });
        return win
    }

    // static closeWindow(win){
    //     win.destroy()
    // }
}

module.exports = CustomDialog