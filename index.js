const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { writeFile, existsSync, mkdirSync} = require("fs");
const path = require('path');
const os = require("os");


class MainWindow extends BrowserWindow {
  //пути к файлам
  #homeDir = path.join(os.homedir(), "/.config/deadliner");
  #db_path = path.join(this.#homeDir, "/db.json");
  #config_path = path.join(this.#homeDir, "/config.json");

  //создаю основное окно
  constructor(w, h) {
    super({
      width: w,
      height: h,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "src/preload.js"),
        webSecurity: false,
        devTools: true,
      }
    });

    //проверяю есть ли конфиги
    if (!existsSync(this.#homeDir)) {
      mkdirSync(this.#homeDir)//если нету конфигов, то создаю папку

      console.log(this.#homeDir, this.#db_path, this.#config_path);
    }
    
    //функции проверки существования "базы данных" и конфигов
    this.#databaseCheck();//проверка на существование бд
    this.#confCheck();//проверка на существование конфигов


    //создаю событие при натсуплении которого будет происходить удаление
    ipcMain.handle('DOOMDAY', async (_event) => {
      const { readFile, rm } = require("fs/promises")
      const isBabe = await readFile(this.#config_path)
      .then(data => JSON.parse(data))
      .then(data => data.option.isBaby)
      /*
      if ( !isBabe ){//если false то удаляются только задния
        rm(this.#db_path, {force: true})
        .then(res => {
          console.log(res); 
          console.log("delete tasks");
          app.exit(0)
        })
      }
      else{
        rm(this.#homeDir, {recursive: true,force: true})
        .then(res => {
          // console.log(res); 
          console.log("remove all folder");
          app.exit(0)
        })
      }*/

      dialog.showErrorBox("Удаление", "вы пропустили время сдачи, пока!")

    });

    this.loadFile(path.join(__dirname, "public/index.html"));//основная страница

  }

  #confCheck() {
    if (!existsSync(this.#config_path)) {//если конфигов нету
      let code = dialog.showMessageBoxSync(this, {//вопрос на удаление всей системы или только бд
        message: "u are fucked?",
        buttons: ["no", "yes"],
        type: "question"
      })
      if (code) {//если выбор был "yes", то удаляется только бд
        writeFile(this.#config_path, JSON.stringify({ option: { "isBaby": false } }), (err) => false);
        return false;
      }
      else {
        writeFile(this.#config_path, JSON.stringify({ option: { "isBaby": true } }), (err) => false);
        console.log("config exist");
        return true;
      }
    }
  }

  #databaseCheck() {//просто проверка существования файла бд
    if (!existsSync(this.#db_path)) writeFile(this.#db_path, JSON.stringify([]), (err) => {console.log(err);});
  }
}



app.whenReady().then(() => {
  new MainWindow(800, 600);
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
