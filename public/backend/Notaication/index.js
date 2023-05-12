const { createNotification, setContainerWidth, setGlobalStyles} = require("electron-custom-notifications");


/**
 * @returns Notification
 */
class MyNotafication{

    /**
     * @description функция создаёт уведомление без картинки
     * @param {Object} opt
     * @param {title:String, description:String, html: String, css: String, timeout: Number, width: Number}
     */
    createEmptyNotif(opt){

        this.title = opt.title || 'title';
        this.desc = opt.description || "desc";
        this.html =  opt.html || `
            <h1>${this.title}</h1>
            <p>${this.desc}</p>
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
      `;
        this.timeout = opt.timeout || 5000
        

        setContainerWidth(350);
        setGlobalStyles(this.css);

        return createNotification({content: this.html, timeout: this.timeout})

    }
}

module.exports = new MyNotafication()