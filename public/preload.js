const { contextBridge, ipcRenderer } = require("electron");
const { TL } = require("./backend/todo");
const { DateTime } = require("luxon")
const { sep } = require("path");


contextBridge.exposeInMainWorld("todo", {
    //добавление задания
    add: (task, deadline, description, files) => TL.addTask(task, deadline, description, files),
    //получение задания по id
    getTask: (id) => TL.getTask(id),
    //удвляет задание из БД
    delete: (id) => TL.deleteTask(id),
    //получение всех заданий
    get: () => TL.getTasks(),
    //редактирование задания
    edit: (id, name) => TL.editTask(id, name),
    //удаление файла
    removeFile: (name) => TL.removeTaskFile(name),
    //ипользовал для нормального форматирования времени
    timeDiff: DateTime,
    //открывает указанный файл. Если файла нету в папках заданий - выдаёт ошибку
    openFile: (file) => TL.openFile(file),
    //сепаратор. Использовал для ..... а я не поню уже, короче это разделитель для путей в ФС
    //пусть будет
    sep: sep,
})

contextBridge.exposeInMainWorld("notification", {
    //уведомления. Функция для создания уведомления. в opt передаёшь объект
    //что передавать смотри при наведении на фунцию в handlers.js
    createNotification: (opt)=>{ipcRenderer.send("createNotafication", opt)}
})

//здесь находятся обработчики, которые ты можешь использовать
contextBridge.exposeInMainWorld("handel", {
    /*обработчик ошибок. Все ошибки прилетают сюда
    в callback передаётся какая-то системная штука(первый аргумент)
    2-м передаётся название ошибки
    сделал так, чтобы ты сама подбирала диалоговые окна
    */
    errorHadler: (cb)=>ipcRenderer.on("exceptErrorHandler", cb),
    //тоже самое что с ошибками, только сюда прилетаю различные вызываемые сной события(я ещё думаю нужен ли этот обработчик)
    eventHandler: (cb)=>ipcRenderer.on("exceptErrorHandler", cb),
    //обработчик выхода. Сделан для прослкшки нажатия в трее. так же что делать при событии определяешь в callback'е
    exitHandler: (cb)=>ipcRenderer.on("exitHandler", cb),
    //выход. вызов этой функции закрывает приложение
    exit: ()=>{ipcRenderer.send("exit")},
})