const { app, BrowserWindow } = require("electron");
const path = require("path");

class MainWindow extends BrowserWindow {
  constructor(w, h) {
    super({
      width: w,
      height: h,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    this.loadFile(path.join(__dirname, "public/index.html"));
  }

}

app.whenReady().then(() => {
  new MainWindow(800, 600);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
