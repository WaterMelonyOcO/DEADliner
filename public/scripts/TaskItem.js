
class TaskItem{

    constructor(id, name, deadline) {
        this.now = new Date();

        this.taskName = name;
        this.deadline = deadline;

        return this.#buildItem(id, this.taskName, this.deadline)
    }

    // #verifyTime(time){
    //     try {
    //         this.time = convertDateToUTC(new Date(time));

    //         if ( this.time <= this.now ){
    //             throw Error("Date_Error");
    //         }

    //         return this.time;
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    #buildItem(id, Name, deadline){
        const taskConteiner = document.createElement("div");
        const taskOptions = document.createElement("div");

        taskConteiner.className = "taskConteiner";
        taskConteiner.id = id;
        taskOptions.className = "taskOptions";

        const taskName = document.createElement("h2");
        taskName.className = "taskName";
        taskName.textcontent = Name;

        const taskDeadline = document.createElement("p");
        taskDeadline.className = "taskDeadline";
        taskDeadline.textContent = deadline;

        const editButton = document.createElement("button")
        const delButton = document.createElement("button")

        editButton.className = "optionsBtn";
        delButton.className = "optionsBtn";

        taskOptions.append(editButton, delButton);
        taskConteiner.append(taskName, taskDeadline, taskOptions);

        return taskConteiner;
    }
}