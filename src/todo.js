const luxon = require("luxon")
const {writeFile, readFileSync} = require("fs");
const {join} = require('path');
const os = require("os");
const EventEmitter = require("events");

class TodoList{
    #TodoListArr = [];
    #homeDir = join(os.homedir(), "/.config/deadliner");
    #db_path = join(this.#homeDir, "/db.json");
    evn = new EventEmitter();
    
    constructor(){

        //кое как костылём сделал слушатель для вызова DEAD события

        try {

            this.exempleDate = luxon.DateTime;
            // console.log(this.#TodoListArr);
            this.#TodoListArr = JSON.parse(readFileSync(this.#db_path));
            // readFileS(this.#homeDir,(err, data)=>{
            //     console.log(data);
            //     this.#TodoListArr = JSON.parse(data)
            // });
        } catch (error) {
            console.log(error.message);
            return false;
        }

        this.#TodoListArr.forEach((i)=>this.#checkDEAD(i.deadline));
        setInterval(()=>{
            this.#TodoListArr.forEach((i)=>this.#checkDEAD(i.deadline));
            console.log("checked time");
        }, 10000)
    }

    addTask(taskName, deadline){
        
        try{
            [this.deadline, this.cTime] = this.#verifyTime(deadline)
        }
        catch(err){
            console.log(err.message);
            return false;
        }

        let id = this.#TodoListArr.length + 1;
        
        // console.log(this.deadline, createTime);

        let Task = {id: id, name: taskName, deadline: this.deadline, time: this.cTime}

        this.#TodoListArr.push(Task);
        writeFile(this.#db_path, JSON.stringify(this.#TodoListArr), (err)=>{if (err) console.log(err.message, "write error");});
        
        console.log(this.#TodoListArr);
        return id;
    }

    getTasks(){
        return this.#TodoListArr;
    }

    editTask(id, taskName){
        this.taskName = taskName;
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);
        
        // console.log(TaskIndex);
        if ( TaskIndex < 0 ) {throw new Error("NO_ELEMENT")}

        this.#TodoListArr[TaskIndex].name = this.taskName;
        writeFile(this.#db_path, JSON.stringify(this.#TodoListArr), (err)=>{if (err) console.log(err.message, "write error");});
        console.log(this.#TodoListArr);
    }

    deleteTask(id){
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);
        
        if ( TaskIndex < 0 ){ throw new Error("NO_ELEMENT_TO_REMOVE") }
        
        this.#TodoListArr.splice(TaskIndex, 1);
        writeFile(this.#db_path, JSON.stringify(this.#TodoListArr), (err)=>{if (err) console.log(err.message, "write error");});
        
        console.log(this.#TodoListArr);
        return true;
    }

    #timeFormat(time){
        this.time = new Date(time).toISOString();
        // console.log(this.time);
        return luxon.DateTime.fromISO(this.time).toFormat("yyyy-MM-dd HH:mm");
    }

    #verifyTime(time){
        
        this.dTime = this.#timeFormat(time);
        this.cTime = this.#timeFormat(new Date().toISOString());

        // console.log(this.dTime, this.cTime);

        if ( this.dTime <= this.cTime ){
            throw Error("Date_Error");
        }
        else{
            return [this.dTime, this.cTime];
        }
    }

    #checkDEAD(elem){
        try {
            const res = this.#verifyTime(elem);
            return true;
        } catch (error) {
            this.evn.emit("DOOMDAY")
        }
    }
}

module.exports.TL = new TodoList()