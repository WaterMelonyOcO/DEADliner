
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

    static showMessageDialog(load, preload, callback, chanelName = "MessageData"){
        const win = new CustomDialog(load, preload)
        win.loadFile(load)

        ipcMain.on(chanelName, (_, data) => {
            return callback(data)
        });
        return win
    }

    static showBoxDialog(load, preload, callback){
        const win = new CustomDialog(load, preload)
        win.loadFile(load)

        return win
    }

    // static closeWindow(win){
    //     win.destroy()
    // }
}

module.exports = CustomDialog