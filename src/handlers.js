const { dialog } = require("electron");
const { db_path, homeDir } = require("./paths").paths;

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
    }

    invalidDate(arg = null) {
        dialog.showErrorBox("Неправильное время", "Вы ввели неправильно время.\n пожалуйста введите корректную дату и время")
        console.log(arg);
    }

    onDeleteTask(_, title = "удаление задания", message = "Вы точно хотите удалить задание?"){
        _.returnValue =  dialog.showMessageBoxSync(null, {
            title:title,
            message: message,
            buttons: ['Нет', 'Да']
        })
    }

    linkedFile(){
        console.log("link");
        // dialog.showMessageBox()
    }
}

module.exports = new Handlers();
