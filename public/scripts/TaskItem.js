
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

        const taskName = document.createElement("input");
        taskName.className = "taskName";
        taskName.value = Name.length !== 0 ? Name : "no_name";
        taskName.dataset.taskName = taskName.value;
        taskName.addEventListener("input", chNameListener)

        const taskDeadline = document.createElement("p");
        taskDeadline.className = "taskDeadline";
        taskDeadline.textContent = deadline;

        const editButton = document.createElement("button")
        const delButton = document.createElement("button")

        editButton.classList = "optionsBtn editBtn";
        editButton.addEventListener("click", editTask)
        editButton.disabled = true;
        editButton.textContent = "edit"

        delButton.classList = "optionsBtn deleteBtn";
        delButton.textContent = "delete";
        delButton.addEventListener("click", deleteTask)

        taskOptions.append(editButton, delButton);
        taskConteiner.append(taskName, taskDeadline, taskOptions);

        return taskConteiner;
    }
}