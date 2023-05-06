const { dialog, ipcRenderer, ipcMain } = require("electron");
const { db_path, homeDir } = require("./paths").paths;
const { CustomDialog } = require("./CustomDialog/CustomDialog")

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

    rewriteFile() {
        let chooses = dialog.showMessageBoxSync(null, {
            title: "rewrite data",
            message: "файл с таким именем уже существует.\n Перезаписать существующий файл?",
            buttons: ['нет', 'да']
        })
        return chooses;
        // return new Promise((resolve, reject)=>{
        //     CustomDialog.showMessage({button:['yes', 'no'], title:title, desc: message}, (data)=>{
        //         resolve(data);
        //     })
        // })
    }

    invalidDate(arg = null) {
        dialog.showErrorBox("Неправильное время", "Вы ввели неправильно время.\n пожалуйста введите корректную дату и время")
        console.log(arg);
    }

    onDeleteTask(title = "удаление задания", message = "Вы точно хотите удалить задание?") {

        CustomDialog.showMessage({ button: ['yes', 'no'], title: title, desc: message })
        return new Promise((resolve, reject)=>{
            ipcRenderer.on("dialog::Send::Data", (data)=>{resolve(data)})
        })
        // return 1
    }

    exit(title = "выход из приложения", message = "вы уверены, что хотите закрыть приложение?") {
        CustomDialog.showMessage({ button: ['yes', 'no'], title: title, desc: message })
        return new Promise((resolve, reject)=>{
            ipcMain.on("dialog::Send::Data", (data)=>{console.log(data, "dialog::send::data other main");resolve(data)})
        })
    }
}

module.exports = new Handlers();