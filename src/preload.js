const { contextBridge, BrowserWindow, ipcRenderer } = require("electron");
const elec = require("electron").remote
const { TL } = require("./todo");
const { DateTime } = require("luxon")
const { sep } = require("path");
const { electron } = require("process");
// const TLs = new TL()
//time
//

contextBridge.exposeInMainWorld("todo", {
    add: (task, deadline, description, files) => TL.addTask(task, deadline, description, files),
    getTask: (id) => TL.getTask(id),
    delete: (id) => TL.deleteTask(id),
    get: () => TL.getTasks(),
    edit: (id, name='', description='') => TL.editTask(id, name),
    removeFile: (name) => TL.removeTaskFile(name),
    timeDiff: DateTime,
    openFile: (file) => TL.openFile(file),
    sep: sep,
})

