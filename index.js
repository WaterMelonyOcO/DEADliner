const { app, BrowserWindow, dialog, ipcMain, BrowserView, webContents } = require("electron");
const { writeFile, existsSync, mkdirSync } = require("fs");
const Handlers = require("./src/handlers");
const { mkdir } = require("fs/promises");
const { paths } = require("./src/paths");
const { resolve, join } = require("path");
const handlers = require("./src/handlers");
const { MTray } = require("./src/tray");

class MainWindow extends BrowserWindow {


  //создаю основное окно
  constructor(w = 800, h = 600) {
    super({
      width: w,
      height: h,
      webPreferences: {
        nodeIntegration: true,
        preload: resolve(__dirname, "src", "preload.js"),
        webSecurity: false,
        devTools: true,
      }
    });

    // this.menuBarVisible = false;
    // console.log(paths.homeDir);
    //проверяю есть ли конфиги
    if (!existsSync(paths.homeDir)) {
      mkdirSync(paths.homeDir, { recursive: true })//если нету конфигов, то создаю папку

      console.log(paths.homeDir, paths.db_path, paths.config_path);
    }

    //функции проверки существования "базы данных" и конфигов
    this.#databaseCheck();//проверка на существование бд
    this.#confCheck();//проверка на существование конфигов
    this.#filesFolderCheck();

    this.on("close", (ev) => {
      ev.preventDefault();
      this.hide();
    })

    //создаю событие при натсуплении которого будет происходить удаление
    ipcMain.handle('DOOMDAY', (_event) => Handlers.DOOMDAY(paths.config_path, null, app, this));
    ipcMain.on('dataErr', (_event) => Handlers.invalidDate());
    ipcMain.on("rewriteError", (_event) => Handlers.rewriteFile());
    // ipcMain.on("deleteTask", async (_event) => Handlers.onDeleteTask(_event))
    ipcMain.on("exit", (_event) => Handlers.exit(_event))
    ipcMain.on('trayTask', (_event, tName, time, desc, file) => {
      console.log("main aaaaaaaaaa");
      // console.log(tName, time, desc, file);
      this.webContents.send('trayAddTask', tName, time, desc, file);
      this.reload()
    })

//CUSTOM DIALOG WINDOW
    
    // new Notification({
    //   title:"djsok",
    //   body: "<h1 style='color:red;'>dlfmglmdfg</h1>"
    // }).show()
    // CustomDialog.showMessage({button:["one", "two"],title: "new title"},(data)=>{
    //   console.log(data);
    // })
    // CustomDialog.showError({desc:"some err title"})
    this.loadFile(resolve(__dirname, "public", "index.html"));//основная страница

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

  #filesFolderCheck() {
    if (!existsSync(paths.filesFolder)) {
      mkdir(paths.filesFolder)
        .then(data => { console.log("files folder not exist. create....", data); })
        .catch((err) => { console.log("error on create files folder\n" + err); })
    }
  }

  #databaseCheck() {//просто проверка существования файла бд
    if (!existsSync(paths.db_path)) writeFile(paths.db_path, JSON.stringify([]), (err) => { console.log(err); });
  }
}



app.whenReady().then(() => {
  const win = new MainWindow(1280, 985);

  const tray = new MTray(win, app);//tray

  app.on('activate', () => {
    if (win.getAllWindows().length === 0) new MainWindow()
  })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

