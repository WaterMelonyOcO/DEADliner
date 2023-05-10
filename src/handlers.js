const { dialog, ipcRenderer, ipcMain, BrowserWindow, app } = require("electron");
const { join } = require("path");
const { db_path, homeDir } = require("./paths").paths;
const CustomDialog = require("./CustomDialog")

class Handlers {

    async DOOMDAY(confg, db = null, app, windw) {//событие удаления всего
        const { readFile, rm, writeFile } = require("fs/promises")
        // const defaultConfig = {};
        const defaultDB = JSON.stringify([]);
        const isBabe = await readFile(confg)
            .then(data => JSON.parse(data))
            .then(data => data.option.isBaby)

        /*if ( !isBabe ){//если false то удаляются только задния
            
            writeFile( db_path, defaultDB,{force: true})
            .then(res => {
            console.log(res); 
            console.log("delete tasks");
            windw.reload();
            // app.exit(0)
            })
        }
        else{
            rm(homeDir, {recursive: true,force: true})
            .then(res => {
            // console.log(res); 
            console.log("remove all folder");
            app.exit(0)
            })
        }*/

        dialog.showErrorBox("Удаление", "вы пропустили время сдачи, пока!")

    }

    rewriteFile(app, load = join(__dirname, "CustomDialog", 'rewriteDialog', "main.html"), preload = join(__dirname, "CustomDialog", "rewriteDialog", "preload.js")) {
        let a = new Promise((resolve, reject) => {
            CustomDialog.showMessageDialog(load, preload, (arg)=>{
                resolve(arg)
            })
        })

        a.then((arg)=>{console.log(arg,"lkdflkdfkldfkldfkldkfldfk");})
    }


    invalidDate(arg = null) {
        dialog.showErrorBox("Неправильное время", "Вы ввели неправильно время.\n пожалуйста введите корректную дату и время")
        console.log(arg);
    }

    onDeleteTask(_) {
        _.returnValue = 1
    }

    exit(app, load = join(__dirname, "CustomDialog", 'exitDialog', "main.html"), preload = join(__dirname, "CustomDialog", "exitDialog", "preload.js")) {

        // CustomDialog.exit(app, load, preload)
        let win = CustomDialog.showMessageDialog(load, preload, (arg) => {
            if (!+arg) {
                app.exit(0)
            }
            else {
                win.destroy()
            }
        })
        // console.log(a, 'kjfekldsk');

        // const win = new BrowserWindow({
        //     webPreferences: {
        //         nodeIntegration: true,
        //         preload: preload,
        //         webSecurity: false,
        //         devTools: true,
        //     }
        // })
        // win.loadFile(load)

        // ipcMain.on('exit', (_, data) => {
        //     console.log(data);
        //     if ( +data === 1 ){
        //         app.exit(0)
        //     }
        //     else{
        //         win.destroy()
        //     }
        // });
    }
}

module.exports = new Handlers();