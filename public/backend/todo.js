const luxon = require("luxon")
const { writeFile, readFileSync, mkdir, existsSync, copyFileSync, rmSync, mkdirSync, readdirSync, rm } = require("fs");
const { ipcRenderer, shell } = require("electron");
const clock = require("date-events");
const { paths } = require("./paths");
const { resolve, sep, join, dirname } = require("path");
const handlers = require("./handlers");

class TodoList {
    #TodoListArr = [];

    constructor() {

        //кое как костылём сделал слушатель для вызова DEAD события

        try {

            this.exempleDate = luxon.DateTime;
            // console.log(this.#TodoListArr);
            this.#TodoListArr = JSON.parse(readFileSync(paths.db_path));

        } catch (error) {
            console.log(error.message);
            return false;
        }

        this.#TodoListArr.forEach((i) => this.#checkDEAD(i.deadline));
        clock().on("*:*", () => {
            this.#TodoListArr.forEach((i) => this.#checkDEAD(i.deadline));
        })

        ipcRenderer.on("deleteTask", (_, data) => {
            if (data) {
                this.deleteTask(data)
            }
        })

        ipcRenderer.on("trayAddTask", (ev, taskName, deadline, description, files) => {
            console.log("todo event", taskName, deadline, description, files);
            this.addTask(taskName, deadline, description, files);
        })

        ipcRenderer.send("createNotafication", {title:"вход", description: this.#randomPhrase()})
    }

    /**
     * 
     * @param {String} taskName 
     * @param {String} deadline @description дата должна быть в формате DD:MM:YYYYThh:mm
     * @param {String} description 
     * @param {Array[String || path]} files 
     * @return {Number} возвращает id таска
     */
    addTask(taskName, deadline, description = "", files = []) {

        let id = this.#TodoListArr.length + 1;
        this.files = [];

        try {
            [this.deadline, this.cTime] = this.#verifyTime(deadline)
        }
        catch (err) {
            // console.log(err);
            ipcRenderer.send("exceptError", err)
            return false;
        }
        let newTaskFolder = join(paths.filesFolder, `task_${id}_${Math.floor(Math.random() * 20)}`)
        mkdirSync(newTaskFolder);
        for (let file of files) {
            copyFileSync(file.path, join(newTaskFolder, file.name));
            this.files.push(file.name)
        }

        console.log("configure task");
        let Task = {
            id: id,
            name: taskName,
            deadline: this.deadline,
            CreateTime: this.cTime,
            description: description,
            files: this.files,
            filePath: newTaskFolder
        };

        this.#TodoListArr.push(Task);
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });

        console.log(this.#TodoListArr);
        ipcRenderer.send("createNotafication", {
            title: "добавление задание", description: `У лукоморья дуб зелёный;
        Златая цепь на дубе том:
        И днём и ночью кот учёный
        Всё ходит по цепи кругом;
        Идёт направо — песнь заводит,
        Налево — сказку говорит.
        Там чудеса: там леший бродит,
        Русалка на ветвях сидит;
        Там на неведомых дорожках
        Следы невиданных зверей;
        Избушка там на курьих ножках
        Стоит без окон, без дверей;
        Там лес и дол видений полны;
        Там о заре прихлынут волны
        На брег песчаный и пустой,
        И тридцать витязей прекрасных
        Чредой из вод выходят ясных,
        И с ними дядька их морской;
        Там королевич мимоходом
        Пленяет грозного царя;
        Там в облаках перед народом`})

        return id;
    }

    /**
     * 
     * @return {Array} 
     */
    getTasks() {
        return this.#TodoListArr;
    }

    /**
     * 
     * @param {Number} id 
     * @return {Object}
     */
    getTask(id) {
        return this.#TodoListArr.filter((i) => i.id === id)[0];
    }

    /**
     * 
     * @param {Number} id 
     * @param {String} taskName 
     * @param {String} taskDesc 
     * @description функция для изменения даынных о задании
     */
    editTask(id, taskName, taskDesc = '') {
        this.taskName = taskName;
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);

        // console.log(TaskIndex);
        if (TaskIndex < 0) { throw new Error("NO_ELEMENT") }

        this.#TodoListArr[TaskIndex].name = this.taskName;
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });
        console.log(this.#TodoListArr);
    }

    /**
     * 
     * @param {Number} id 
     * 
     */
    deleteTask(id) {
        const TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);

        if (TaskIndex < 0) { throw new Error("NO_ELEMENT_TO_REMOVE") }

        try {
            const deletedTask = this.#TodoListArr.splice(TaskIndex, 1);
            this.removeTaskFolder(deletedTask[0].filePath);
            writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => {
                if (err)
                    console.log(err.message, "write error");
            });
            return true
        } catch (error) {
            console.log("error on delete task\n", error);
            ipcRenderer("excetError", new Error("DELETE_TASK_ERROR"))
            return false;
        }
        finally {
            console.log(this.#TodoListArr);
        }

    }

    /**
     * 
     * @param {path} path 
     */
    removeTaskFolder(path) {
        if (!existsSync(path)) {
            throw SyntaxError("removed file not exist");
        }
        rmSync(path, { force: true, recursive: true });
    }

    /**
     * 
     * @param {String} fileName 
     * @description рекурсивно обойдёт все папки заданий. Если ничего не найдёт - выкинет ошибку
     */
    openFile(fileName) {
        const path = this.#getFilePath(fileName);
        if (path) {
            shell.openPath(path)
                .then((data) => { console.log("open file ---- ", data); return })
                .catch((err) => { console.log("error on open file"); ipcRenderer("excetError", err); return })
        }
        // throw new Error("FILE_NOT_FOUND").name="FILE_NOT_EXIST";
    }

    /**
     * 
     * @param {String} filename 
     * @description удаляет файл задания
     */
    deleteTaskFile(filename) {
        const path = this.#getFilePath(filename);
        rm(path, (data) => {
            if (data) console.log(data);
        })
    }

    /**
     * 
     * @param {String} time 
     * @returns {luxon}
     */
    #timeFormat(time) {
        this.time = new Date(time).toISOString();
        // console.log(this.time);
        return luxon.DateTime.fromISO(this.time).toFormat("yyyy-MM-dd HH:mm");
    }

    #verifyTime(time) {
        console.log(time);
        this.dTime = this.#timeFormat(time);
        this.cTime = this.#timeFormat(new Date().toISOString());
        // console.log(this.dTime, this.cTime);

        if (this.dTime <= this.cTime) {
            throw Error("Date_Error");
        }
        else {
            return [this.dTime, this.cTime];
        }
    }

    #checkDEAD(elem) {
        try {
            let trach = this.#verifyTime(elem);
            console.log("checked time");
        } catch (error) {
            console.log("DOOOM");
            ipcRenderer.send("createNotafication", {
                title: "Время вышло", description: `Скажи-ка, дядя, ведь недаром
            Москва, спаленная пожаром,
            Французу отдана?
            Ведь были ж схватки боевые,
            Да, говорят, еще какие!
            Недаром помнит вся Россия
            Про день Бородина!`})
            ipcRenderer.send("DOOMDAYEvent")
        }
    }

    #getFilePath(fileName) {
        for (let fold of readdirSync(paths.filesFolder)) {
            for (let file of readdirSync(resolve(paths.filesFolder, fold))) {
                if (file === fileName) {
                    return resolve(paths.filesFolder, fold, fileName);
                }
            }
        }
        return false;
    }

    #randomPhrase(){
        const phrases = ["привет, ты скоро уйдёшь?", "привет /(^ ^)/", "ух, да ты слабее, чем я думал"]
        const randNumber = Math.floor(Math.random() * (phrases.length ))
        const phrase = phrases[randNumber]

        return phrase
    }
}

const TL = new TodoList()
module.exports.TL = TL