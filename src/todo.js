const luxon = require("luxon")
const { writeFile, readFileSync, mkdir, existsSync, copyFileSync, rmSync, mkdirSync, readdirSync } = require("fs");
const { ipcRenderer, dialog, shell } = require("electron");
const clock = require("date-events");
const { paths } = require("./paths");
const { resolve, sep, join, dirname } = require("path");

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
    }

    addTask(taskName, deadline, description = "", files = []) {

        let id = this.#TodoListArr.length + 1;
        this.files = [];

        try {
            [this.deadline, this.cTime] = this.#verifyTime(deadline)
        }
        catch (err) {
            console.log(err);
            if (err.name === "TypeError") {
                ipcRenderer.invoke("dataErr", "TypeError");
                return;
            }
            else if (err.name === "RangeError") {
                ipcRenderer.invoke("dataErr");
                return;
            }
            else if (err.message === "Date_Error") {
                ipcRenderer.invoke("dataErr");
                return;
            }
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
            time: this.cTime,
            description: description,
            files: this.files,
            filePath: newTaskFolder
        };

        this.#TodoListArr.push(Task);
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });

        console.log(this.#TodoListArr);
        return id;
    }

    getTasks() {
        return this.#TodoListArr;
    }

    getTask(id) {
        return this.#TodoListArr.filter((i) => i.id === id);
    }

    editTask(id, taskName) {
        this.taskName = taskName;
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);

        // console.log(TaskIndex);
        if (TaskIndex < 0) { throw new Error("NO_ELEMENT") }

        this.#TodoListArr[TaskIndex].name = this.taskName;
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });
        console.log(this.#TodoListArr);
    }

    deleteTask(id) {
        const TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);

        if (TaskIndex < 0) { throw new Error("NO_ELEMENT_TO_REMOVE") }

        try {
            const deletedTask = this.#TodoListArr.splice(TaskIndex, 1);
            this.removeTaskFolder(deletedTask[0].filePath)
            writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });
        } catch (error) {
            console.log("error on delete task\n", error);
        }

        console.log(this.#TodoListArr);
        return true;
    }

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

    removeTaskFolder(path) {
        if ( !existsSync(path) ) {
            throw SyntaxError("removed file not exist");
        }
        rmSync(path, { force: true, recursive: true });
    }

    #checkDEAD(elem) {
        try {
            let trach = this.#verifyTime(elem);
            console.log("checked time");
        } catch (error) {
            console.log("DOOOM");
            ipcRenderer.invoke("DOOMDAY")
        }
    }

    openFile(fileName) {
        shell.openPath(resolve(paths.filesFolder, fileName))
            .then((data) => { console.log("open file ---- ", data); })
            .catch((err) => { console.log("error on open file"); })
    }
}

const TL = new TodoList()
module.exports.TL = TL