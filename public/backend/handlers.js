const { dialog } = require("electron");
const { db_path, homeDir, soundPath } = require("./paths").paths;
const { createNotification, setContainerWidth, setGlobalStyles } = require("electron-custom-notifications");
const { join } = require("path");
const sound = require("play-sound")
const notif = require("./Notaication")


class Handlers {

    async DOOMDAY(confg, db = null, app, windw) {//событие удаления всего
        const { readFile, rm, writeFile } = require("fs/promises")
        // const defaultConfig = {};
        const defaultDB = JSON.stringify([]);
        const isBabe = await readFile(confg)
            .then(data => JSON.parse(data))
            .then(data => data.option.isBaby)

        
            this.EmptyNotafication()
        // sound({players:["play"]}).play(join(soundPath,"duck.mp3"), (err)=>{
        //     console.log(err);
        // })
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

    onDeleteTask(_, title = "удаление задания", message = "Вы точно хотите удалить задание?") {
        _.returnValue = dialog.showMessageBoxSync(null, {
            title: title,
            message: message,
            buttons: ['Нет', 'Да']
        })
    }

    exit(title = "выход из приложения", message = "вы уверены, что хотите закрыть приложение?") {
        return dialog.showMessageBoxSync({
            title: title,
            message: message,
            buttons: ["Нет", "Да"]
        })
    }

    EmptyNotafication(opt) {
        console.log(opt);
        this.title = opt.title || 'title';
        this.desc = opt.description || "desc";
        this.html = `
            <h1>${this.title}</h1>
            <p>${this.desc}</p>
        ` ;
        this.css = `
        * {
          font-family: Helvetica;
        }
        .notification {
          display: block;
          padding: 20px;
          background-color: #fff;
          border-radius: 12px;
          margin: 10px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
        .notification h1 {
          font-weight: bold;
        }
      `;
        this.timeout = opt.timeout || 5000
        this.width = opt.width || 350

        setContainerWidth(this.width)
        setGlobalStyles(this.css);

        createNotification({
            content: this.html,
            timeout: 5000
        })

        // notif.on("click", () => {

        // })
    }
}

module.exports = new Handlers();
