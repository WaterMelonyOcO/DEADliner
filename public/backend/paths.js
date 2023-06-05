const { join, normalize, resolve} = require("path");
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
        trayIcon: this.trayIcon = resolve(__dirname, "..", "..", "media", 'images', 'favicon.png'),
        soundPath: this.soundPath = resolve(__dirname, "..", "..", "media", 'sound'),
        phrasesPath: this.phrasesPath = resolve(this.homeDir, "phrases.json"),
        tagsDataPath: this.tagsDataPath = resolve(this.homeDir, "tags.json"),
        frontPath: this.frontPath = resolve(__dirname, "..", "..", "src", 'preload.js')
    }
}

module.exports.paths = paths()