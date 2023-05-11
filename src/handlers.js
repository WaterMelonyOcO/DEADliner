const { dialog, ipcRenderer, ipcMain, BrowserWindow, app } = require("electron");
const { join } = require("path");
const { db_path, homeDir } = require("./paths").paths;
let CustomDialog = require("./CustomDialog")

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

    rewriteFile(_, load = join(__dirname, "CustomDialog", 'rewriteDialog', "main.html"), preload = join(__dirname, "CustomDialog", "rewriteDialog", "preload.js")) {
        this.#templateVoid(_, load, preload)
    }


    invalidDate(_, load = join(__dirname, "CustomDialog", 'rewriteDialog', "main.html"), preload = join(__dirname, "CustomDialog", "rewriteDialog", "preload.js")) {
        this.#templateVoid(_, load, preload)
    }

    async onDeleteTask(_,load = join(__dirname, "CustomDialog", 'exitDialog', "main.html"), preload = join(__dirname, "CustomDialog", "exitDialog", "preload.js")) {
        let num = new Promise((resolve, reject) => {
            let win = CustomDialog.showMessageDialog(load, preload, async (data) => {
                resolve(data)
                win.destroy()
            })
        })
        console.log("data promise: " + await num);
        _.returnValue = await num
    }

    exit(app, load = join(__dirname, "CustomDialog", 'exitDialog', "main.html"), preload = join(__dirname, "CustomDialog", "exitDialog", "preload.js")) {

        //
        let win = CustomDialog.showMessageDialog(load, preload, (arg) => {
            if (!+arg) {
                app.exit(0)
            }
            else {
                win.destroy()
            }
        })
    }

    /**
     * 
     * @description "шаблон" для окна. Ничего не возвращает, просто закрывает окно с сообщением
     */
    async #templateVoid(_,load, preload){
        let num = new Promise((resolve, reject) => {
            let win = CustomDialog.showBoxDialog(load, preload, async (data) => {
                resolve(1)
                win.destroy()
            })
        })
        console.log("data promise: " + await num);
    }

    /**
     * @description "шаблон" для окон с возвращяемыми значениями
     */
    async #templateData(){
        let num = new Promise((resolve, reject) => {
            let win = CustomDialog.showMessageDialog(load, preload, async (data) => {
                win.on("close", (e)=>{
                    e.preventDefault();
                    resolve(0);
                })
                resolve(data)
                win.destroy()
            })
        })
        console.log("data promise: " + await num);
        _.returnValue = await num
    }
}

module.exports = new Handlers();