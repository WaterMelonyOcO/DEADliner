const luxon = require("luxon")
const {writeFile, readFile, existsSync, mkdirSync} = require("fs");
const {join, resolve} = require('path');
const os = require("os")

class TodoList{
    #TodoListArr = [];
    #homeDir = join(os.homedir(), "/.config/deadliner");
    
    constructor(){
        try {
            if ( !existsSync(this.#homeDir) ){ 
                mkdirSync(this.#homeDir)
                this.#homeDir = join(this.#homeDir, '/db.json');
                writeFile(this.#homeDir, JSON.stringify([]), (err)=>false);
                console.log(this.#homeDir);
            }

            this.exempleDate = luxon.DateTime;

            readFile(this.#homeDir,(err, data)=>{
                this.#TodoListArr =  JSON.parse(data)
            });
        } catch (error) {
            console.log(error.message);
            return false;
        }
        console.log(this.#TodoListArr);
        setInterval(()=>{
            this.#TodoListArr.forEach((i)=>this.#checkDEAD(i.deadline));
            // if ( !this.#checkDBComplited() ) writeFileSync(this.#homeDir, JSON.stringify(this.#TodoListArr));
            console.log("checked time");
        }, 30000)
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
        writeFile(this.#homeDir, JSON.stringify(this.#TodoListArr), (err)=>{if (err) console.log(err.message, "write error");});
        
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
        writeFile(this.#homeDir, JSON.stringify(this.#TodoListArr), (err)=>{if (err) console.log(err.message, "write error");});
        console.log(this.#TodoListArr);
    }

    deleteTask(id){
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);
        
        if ( TaskIndex < 0 ){ throw new Error("NO_ELEMENT_TO_REMOVE") }
        
        this.#TodoListArr.splice(TaskIndex, 1);
        writeFile(this.#homeDir, JSON.stringify(this.#TodoListArr), (err)=>{if (err) console.log(err.message, "write error");});
        
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
            const res = this.#verifyTime(elem)
            // console.log("not now");
        } catch (error) {
            console.log("DEADEADEADEAD");
        }
    }

    // #checkDBComplited(){
    //     const db_data = readFile(this.#homeDir, (err, data));
    //     if ( JSON.stringify(this.#TodoListArr) === db_data ) return true;
    //     return false;
    // }
}

module.exports.TL = new TodoList()