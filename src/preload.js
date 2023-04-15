const { contextBridge } = require("electron");
const { TL } = require("./todo");
const { DateTime } = require("luxon")
// const TLs = new TL()

contextBridge.exposeInMainWorld("todo", {
    add: (task, deadline) => TL.addTask(task, deadline),
    delete: (id) => TL.deleteTask(id),
    get: () => TL.getTasks(),
    edit: (id, name) => TL.editTask(id, name),
    timeDiff: DateTime
})

