
class TodoList{
    #TodoListArr = [];
    
    constructor(){
        
    }

    #verifyTime(time){
        try {
            this.time = new Date(time).toUTCString();

            if ( this.time <= new Date().toUTCString() ){
                throw Error("Date_Error");
            }
            else{
                return this.time;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    addTask(taskName, deadline){
        this.deadline = new Date(deadline).toLocaleString();
        let createTime = new Date().toLocaleString();
        
        let id = this.#TodoListArr.length + 1;
        
        console.log(this.deadline, createTime);
        console.log( Date.parse(createTime) ,Date.parse(this.deadline));

        let Task = {id: id, name: taskName, time: createTime, deadline: deadline}

        this.#TodoListArr.push(Task);
        console.log(this.#TodoListArr);
        return id;
    }

    getTasks(){
        return this.#TodoListArr;
    }

    editTask(id, taskName){
        this.taskName = taskName;
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === id);

        this.#TodoListArr[TaskIndex].name = this.taskName;
    }

    deleteTask(id){
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === id);
        this.#TodoListArr.splice(TaskIndex, 1);
    }
}

module.exports.TL = new TodoList()