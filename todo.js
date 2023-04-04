const luxon = require("luxon")

class TodoList{
    #TodoListArr = [];
    
    constructor(){
        this.exempleDate = luxon.DateTime
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

        let Task = {id: id, name: taskName, time: this.cTime, deadline: this.deadline}

        this.#TodoListArr.push(Task);
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
        console.log(this.#TodoListArr);
    }

    deleteTask(id){
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);
        if ( TaskIndex < 0 ){ throw new Error("NO_ELEMENT_TO_REMOVE") }
        this.#TodoListArr.splice(TaskIndex, 1);
        console.log(this.#TodoListArr);
        return true;
    }

    #timeFormat(time){
        this.time = new Date(time).toISOString();
        return luxon.DateTime.fromISO(time).toFormat("yyyy-mm-dd HH:mm");
    }

    #verifyTime(time){
        
        this.dTime = this.#timeFormat(time);
        this.cTime = this.#timeFormat(new Date().toISOString());

        // console.log(this.dTime, this.cTime);

        // if ( this.dTime <= this.cTime ){
        //     throw Error("Date_Error");
        // }
        // else{
            return [this.dTime, this.cTime];
        // }
    }
}

module.exports.TL = new TodoList()