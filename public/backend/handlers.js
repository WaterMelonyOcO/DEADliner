const { dialog, ipcRenderer } = require("electron");
const { db_path, homeDir, soundPath } = require("./paths").paths;
const { createNotification, setContainerWidth, setGlobalStyles } = require("electron-custom-notifications");
const { join } = require("path");
const sound = require("play-sound")


class Handlers {

    async DOOMDAY(confg, db = null, app, windw) {//событие удаления всего
        const { readFile, rm, writeFile } = require("fs/promises")
        // const defaultConfig = {};
        const defaultDB = JSON.stringify([]);
        const isBabe = await readFile(confg)
            .then(data => JSON.parse(data))
            .then(data => data.option.isBaby)

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
    }

    // exceptErrorHandle(error){
    //     return error
    // }

    exit(app) {
        app.exit(0)
    }

    /**
     * @description функция создаёт уведомление без картинки
     * @param {Object} opt
     * @param {title:String, 
     * description:String, 
     * html: String, 
     * css: String, 
     * timeout: Number, 
     * width: Number,
     * logo: String | Path}
     * @todo доделать кликабельность
     */
    createNotafication(opt) {
        // console.log(opt);
        this.title = opt.title || 'title';
        this.desc = opt.description || "desc";
        this.timeout = opt.timeout || 5000
        this.width = opt.width || 350
        this.logo = opt.logo || undefined
        
        try {
            if ( this.logo ){
                this.logo = require("fs").readFileSync(this.logo, "base64");
                this.htmlLogo = `<div id="logo"></div>`;
                this.cssLogo = `.notification #logo {
                    background-image: url("data:image/png;base64,${this.logo}");
                    background-size: cover;
                    background-position: center;
                    width: 80px;
                    height: 50px;
                  }`
            }
        } catch (error) {
            console.log(error);
        }        
        
        this.html = opt.html || `
        <div class="notification">
        ${this.htmlLogo || ""}
            <h1>${this.title}</h1>
            <p>${this.desc}</p>
        </div>
        ` ;
        this.css = opt.css || `
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
        ${this.cssLogo || ""}
      `;

        setContainerWidth(this.width)
        setGlobalStyles(this.css);

        const notification = createNotification({
            content: this.html,
            timeout: this.timeout,
            // link: "https://youtube.com"
        })
        
        // ipcRenderer.emit("make-clickable", notification.id)

        // notification.on("click", () => {
        //     // Open the YouTube link in a browser.
        //     require("electron").shell.openExternal(
        //       "https://www.youtube.com/watch?v=M9FGaan35s0"
        //     );
        // })      
    }
}

module.exports = new Handlers();
