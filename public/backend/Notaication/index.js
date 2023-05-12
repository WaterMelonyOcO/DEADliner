const { createNotification, setContainerWidth, setGlobalStyles} = require("electron-custom-notifications");


/**
 * @returns Notification
 */
class MyNotafication{

    /**
     * 
     * @param {*} opt 
     * @returns Notification
     */
    createEmptyNotif(opt={title, description, width, html, css, timeout}){

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
        

        setContainerWidth(width);
        setGlobalStyles(this.css);

        createNotification({content: this.html, timeout: this.timeout})

    }
}

module.exports = new MyNotafication()