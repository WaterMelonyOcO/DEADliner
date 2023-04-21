
class TaskItem{

    constructor(id, name, deadline, files=[]) {
        
        let [dt, tm] = deadline.split(" ")//форматирую время в более удобный вид
        dt = dt.split("-").reverse().join("-")//
        this.taskName = name;//
        this.deadline = dt+" "+tm;//
        this.files = files;
        console.log(this.files);

        return this.#buildItem(id, this.taskName, this.deadline, this.files)
    }

    #buildItem(id, Name, deadline, files){
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

        let taskTimer = document.createElement('p');
        taskTimer.className = "taskTimer";

        const editButton = document.createElement("button")
        const delButton = document.createElement("button")

        editButton.classList = "optionsBtn editBtn";
        editButton.addEventListener("click", editTask)
        editButton.disabled = true;
        editButton.textContent = "edit"

        delButton.classList = "optionsBtn deleteBtn";
        delButton.textContent = "delete";
        delButton.addEventListener("click", deleteTask)

        let docConteiner = document.createElement("div");
        docConteiner.className = "docConteiner";
        console.log(files);
        docConteiner.append(...this.#createFilesBlock(files))

        taskOptions.append(editButton, delButton);
        taskConteiner.append(taskName, taskDeadline, taskTimer, taskOptions, docConteiner);

        return taskConteiner;
    }

    #createFilesBlock(files){
        return files.map((i)=>{
            let cont = document.createElement("div");
            cont.dataset.file = i;
            
            cont.style.width="50px";
            cont.style.height="50px";
            cont.style.backgroundColor="pink";
            cont.textContent=i
            
            cont.addEventListener("click", openFile)

            return cont;
        });
    }

}