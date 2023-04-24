const { join, normalize} = require("path");
const { homedir, platform } = require("os")

function userPath(){
    if ( platform() === "win32" ){
        return normalize("AppData/Local/deadliner")
    }
    else if ( platform() === "linux" ){
        return normalize(".config/deadliner")
    }
}

function paths() {
    return {
        homeDir: this.homeDir = join(homedir(),userPath()),
        db_path: this.db_path = join(this.homeDir, "db.json"),
        config_path: this.config_path = join(this.homeDir, "config.json"),
        filesFolder: this.filesFolder = join(this.homeDir, "pickedFiles"),
        trayIcon: normalize("./images/favicon.ico")
    }
}

module.exports.paths = paths()