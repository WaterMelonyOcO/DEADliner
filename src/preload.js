const { contextBridge, ipcRenderer } = require("electron");
const { TL } = require("./todo");
const { DateTime } = require("luxon")
// const TLs = new TL()

contextBridge.exposeInMainWorld("todo", {
    add: (task, deadline, description, files) => TL.addTask(task, deadline, description, files),
    getTask: (id) => TL.getTask(id),
    delete: (id) => TL.deleteTask(id),
    get: () => TL.getTasks(),
    edit: (id, name) => TL.editTask(id, name),
    removeFile: (name) => TL.removeTaskFile(name),
    timeDiff: DateTime,
    openFile: (file) => TL.openFile(file),
})

