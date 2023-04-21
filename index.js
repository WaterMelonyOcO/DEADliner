const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { writeFile, existsSync, mkdirSync } = require("fs");
const { DOOMDAY, invalidDate, rewriteFile } = require("./src/handlers");
const { mkdir } = require("fs/promises");
const { paths } = require("./src/paths");
const { resolve } = require("path");
const { platform } = require("os");


class MainWindow extends BrowserWindow {


  //создаю основное окно
  constructor(w, h) {
    super({
      width: w,
      height: h,
      webPreferences: {
        nodeIntegration: true,
        preload: resolve(__dirname, "src","preload.js"),
        webSecurity: false,
        devTools: true,
      }
    });

    console.log(paths.homeDir);
    //проверяю есть ли конфиги
    if (!existsSync(paths.homeDir)) {
      mkdirSync(paths.homeDir, {recursive: true})//если нету конфигов, то создаю папку

      console.log(paths.homeDir, paths.db_path, paths.config_path);
    }

    //функции проверки существования "базы данных" и конфигов
    this.#databaseCheck();//проверка на существование бд
    this.#confCheck();//проверка на существование конфигов
    this.#filesFolderCheck();

    //создаю событие при натсуплении которого будет происходить удаление
    ipcMain.handle('DOOMDAY', (_event)=>DOOMDAY(paths.config_path));
    ipcMain.handle('dataErr', (_event)=>invalidDate());
    ipcMain.handle("rewriteError", (_event)=>rewriteFile());

    this.loadFile(resolve(__dirname, "public","index.html"));//основная страница

  }

  
  #confCheck() {
    if (!existsSync(paths.config_path)) {//если конфигов нету
      let code = dialog.showMessageBoxSync(this, {//вопрос на удаление всей системы или только бд
        message: "u are fucked?",
        buttons: ["no", "yes"],
        type: "question"
      })
      if (code) {//если выбор был "yes", то удаляется только бд
        writeFile(paths.config_path, JSON.stringify({ option: { "isBaby": false } }), (err) => false);
        return false;
      }
      else {
        writeFile(paths.config_path, JSON.stringify({ option: { "isBaby": true } }), (err) => false);
        console.log("config exist");
        return true;
      }
    }
  }

  #filesFolderCheck(){
    if (!existsSync(paths.filesFolder)){
      mkdir(paths.filesFolder)
      .then(data => {console.log("files folder not exist. create....", data);})
      .catch((err)=>{console.log("error on create files folder\n"+err);})
    }
  }

  #databaseCheck() {//просто проверка существования файла бд
    if (!existsSync(paths.db_path)) writeFile(paths.db_path, JSON.stringify([]), (err) => { console.log(err); });
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
