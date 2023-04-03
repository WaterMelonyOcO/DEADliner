
class TodoList{
    #TodoListArr = [];
    
    constructor(){
        
    }

    #verifyTime(time){
        try {
            this.time = new Date(time).toISOString();

            if ( this.time <= new Date().toISOString() ){
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
        this.deadline = this.#verifyTime(deadline);
        let createTime = new Date().toISOString();
        let id = Math.max.apply(Math, this.#TodoListArr);
        
        // console.log( new Date(createTime).toISOString() >= new Date(deadline).toISOString());

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