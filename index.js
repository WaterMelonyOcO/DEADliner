const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { writeFile, existsSync, mkdirSync} = require("fs");
const path = require('path');
const os = require("os");


class MainWindow extends BrowserWindow {
  //пути к файлам
  #homeDir = path.join(os.homedir(), "/.config/deadliner");
  #db_path = path.join(this.#homeDir, "/db.json");
  #config_path = path.join(this.#homeDir, "/config.json");
  //окно с вопросом об
  //удалении приложения или системы

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
      mkdirSync(this.#homeDir)

      console.log(this.#homeDir, this.#db_path, this.#config_path);
    }
    //функции проверки существования "базы данных" и конфигов
    this.#databaseCheck();
    this.#babyCheck();

    //убираю ненужные менюшки
    // this.setMenu();

    ipcMain.handle('DOOMDAY', async (_event) => {
      const { readFile, rm } = require("fs/promises")
      const isBabe = await readFile(this.#config_path)
      .then(data => JSON.parse(data))
      .then(data => data.option.isBaby)
      
      if ( !isBabe ){
        rm(this.#homeDir, {recursive:true, force: true})
        .then(res => {
          console.log(res); 
          console.log("delete home folder");
          app.exit(0)
        })
      }
      else{
        console.log("remove all system");
        app.exit(0)
      }

      dialog.showErrorBox("D", "kjsdlknf")

    });

    this.loadFile(path.join(__dirname, "public/index.html"));//основная страница

  }

  #babyCheck() {
    if (!existsSync(this.#config_path)) {
      let code = dialog.showMessageBoxSync(this, {
        message: "u are fucked?",
        buttons: ["no", "yes"],
        type: "question"
      })
      if (code) {
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

  #databaseCheck() {
    if (!existsSync(this.#db_path)) writeFile(this.#db_path, JSON.stringify([]), (err) => {console.log(err);});
  }
}



app.whenReady().then(() => {
  new MainWindow(800, 600);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
