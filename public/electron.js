const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { writeFile, existsSync, mkdirSync } = require("fs");
const { mkdir } = require("fs/promises");
const { paths } = require("./backend/paths");
const { resolve, join } = require("path");
const handlers = require("./backend/handlers");
const { MTray } = require("./backend/tray");
const url = require("url");

class MainWindow extends BrowserWindow {


    //создаю основное окно
    constructor(w = 800, h = 600) {
        super({
            width: w,
            height: h,
            webPreferences: {
                nodeIntegration: true,
                preload: resolve(__dirname, "preload.js"),
                // webSecurity: false,
                devTools: true,
            },
            icon: paths.trayIcon
        });

        this.menuBarVisible = false;
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
        this.#phraseCheck();

        this.on("close", (ev) => {
            ev.preventDefault();
            this.hide();
        })

        //создаю событие при натсуплении которого будет происходить удаление
        ipcMain.on('DOOMDAYEvent', (_event) => this.webContents.send("DOOMDAYEvent"));
        ipcMain.handle('DOOMDAY', (_event) => handlers.DOOMDAY(paths.config_path, null, app, this));

        ipcMain.on("exceptError", (ev, err) => {
            // console.log(err);
            this.webContents.send("exceptErrorHandler", err.message)
        })
        ipcMain.on("someEvent", (ev)=> this.webContents.emit("eventHandler"))

        ipcMain.on("exitHandler", (_event)=>{console.log("tray exit event");this.webContents.emit("exitHandler")})
        ipcMain.on("exit", (_event) => handlers.exit(app))

        // ipcMain.on("deleteTask", (_event,)=>{_event.returnValue = 1})
        ipcMain.on('trayTask', (_event, tName, time, desc, file) => {
            console.log("main aaaaaaaaaa");
            // console.log(tName, time, desc, file);
            this.webContents.send('trayAddTask', tName, time, desc, file);
            this.reload()
        })

        ipcMain.on("createNotafication", (e, opt)=>{handlers.createNotafication(opt)})
     

        // const appURL = app.isPackaged
        //     ? url.format({
        //         pathname: join(__dirname, "index.html"),
        //         protocol: "file:",
        //         slashes: true,
        //     })
        //     : "http://localhost:3000";
        // this.loadURL(appURL);
        // handlers.EmptyNotafication()
        this.loadFile(resolve(__dirname, "..", "oldPublic", "index.html"));//основная страница
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

    #phraseCheck(){
        if ( !existsSync( paths.phrasesPath )) writeFile(paths.phrasesPath, JSON.stringify([]), (err)=>{console.log(err);})
    }
}



app.whenReady().then(() => {
    const win = new MainWindow(800, 600);

    const tray = new MTray(win, app);//tray

    app.on('activate', () => {
        if (win.getAllWindows().length === 0) new MainWindow()
    })
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});