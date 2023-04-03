
class TaskItem{

    constructor(id, name, deadline) {
        this.now = new Date();

        this.taskName = name;
        this.deadline = deadline;

        return this.#buildItem(id, this.taskName, this.deadline)
    }

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