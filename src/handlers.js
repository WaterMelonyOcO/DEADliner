const { dialog } = require("electron");
const { db_path, homeDir } = require("./paths").paths;

class Handlers {

    async DOOMDAY(confg, db = null) {//событие удаления всего
        const { readFile, rm } = require("fs/promises")
        const isBabe = await readFile(confg)
            .then(data => JSON.parse(data))
            .then(data => data.option.isBaby)
        /*
        if ( !isBabe ){//если false то удаляются только задния
            rm( db_path, {force: true})
            .then(res => {
            console.log(res); 
            console.log("delete tasks");
            app.exit(0)
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
}

module.exports = new Handlers();
