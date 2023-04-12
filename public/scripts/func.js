const addBtn = document.querySelector("#addTaskBtn");
const content = document.querySelector("#content");


function addTask() {

  let name = document.querySelector("#TaskName");
  let time = document.querySelector("#deadline");

  let timeVal = time.value.split("T").join(" ")

  let cr = todo.add(name.value, time.value);
  if (cr) content.appendChild(new TaskItem(cr, name.value, timeVal))

  name.value = "";
  time.value = "";
}

function getTasks() {
  for (let i of todo.get()) {
    console.log(i);
    content.appendChild(new TaskItem(i.id, i.name, i.deadline))
  }
}

function editTask(e) {

  const taskConteiner = e.target.parentNode.parentNode;
  const inputName = taskConteiner.querySelector(".taskName")
  const editBtn = e.target;

  console.log(taskConteiner.id);
  console.log(taskConteiner);

  try {
    todo.edit(taskConteiner.id, inputName.value)
    inputName.setAttribute("data-task-name", inputName.value)
    editBtn.disabled = true;
  } catch (error) {
    console.log(error.message);
  }
}

function deleteTask(e) {
  const taskConteiner = e.target.parentNode.parentNode;
  try {
    let res = todo.delete(+taskConteiner.id)
    if (res) { taskConteiner.remove(); }
  } catch (error) {
    console.log(error.message);
    alert(error.message)
  }
}

function chNameListener(e) {
  const taskConteiner = e.target.parentNode.parentNode.querySelector(".taskName")
  const defaultName = taskConteiner.getAttribute("data-task-name")
  const editBtn = e.target.parentNode.querySelector(".editBtn")

  console.log(defaultName, e.target.value);
  if (defaultName !== e.target.value) { editBtn.disabled = false }

}

addBtn.addEventListener("click", addTask);
getTasks()