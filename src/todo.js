const luxon = require("luxon")
const { writeFile, readFileSync } = require("fs");
const { join, resolve, normalize } = require('path');
const os = require("os");
const { ipcRenderer } = require("electron");
const clock = require("date-events")

class TodoList {
    #TodoListArr = [];
    #homeDir = resolve(os.homedir(), ".config", "deadliner");
    #db_path = normalize(`${this.#homeDir}/db.json`);

    constructor() {

        //кое как костылём сделал слушатель для вызова DEAD события

        try {

            this.exempleDate = luxon.DateTime;
            // console.log(this.#TodoListArr);
            this.#TodoListArr = JSON.parse(readFileSync(this.#db_path));

        } catch (error) {
            console.log(error.message);
            return false;
        }

        this.#TodoListArr.forEach((i) => this.#checkDEAD(i.deadline));
        clock().on("*:*", () => {
            this.#TodoListArr.forEach((i) => this.#checkDEAD(i.deadline));
        })
    }

    addTask(taskName, deadline) {

        try {
            [this.deadline, this.cTime] = this.#verifyTime(deadline)
        }
        catch (err) {
            console.log(err);
            if (err.name === "TypeError") {
                ipcRenderer.invoke("dataErr", "TypeError");
                return;
            }
            else if ( err.name === "RangeError" ){
                ipcRenderer.invoke("dataErr");
                return;
            }
            else if ( err.message === "Date_Error" ){
                ipcRenderer.invoke("dataErr");
                return;
            }
            return false;
        }

        let id = this.#TodoListArr.length + 1;

        // console.log(this.deadline, createTime);

        let Task = { id: id, name: taskName, deadline: this.deadline, time: this.cTime }

        this.#TodoListArr.push(Task);
        writeFile(this.#db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });

        console.log(this.#TodoListArr);
        return id;
    }

    getTasks() {
        return this.#TodoListArr;
    }

    editTask(id, taskName) {
        this.taskName = taskName;
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);

        // console.log(TaskIndex);
        if (TaskIndex < 0) { throw new Error("NO_ELEMENT") }

        this.#TodoListArr[TaskIndex].name = this.taskName;
        writeFile(this.#db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });
        console.log(this.#TodoListArr);
    }

    deleteTask(id) {
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);

        if (TaskIndex < 0) { throw new Error("NO_ELEMENT_TO_REMOVE") }

        this.#TodoListArr.splice(TaskIndex, 1);
        writeFile(this.#db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });

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


    #checkDEAD(elem) {
        try {
            let trach = this.#verifyTime(elem);
            console.log("checked time");
        } catch (error) {
            console.log("DOOOM");
            ipcRenderer.invoke("DOOMDAY")
        }
    }
}

const TL = new TodoList()
module.exports.TL = TL