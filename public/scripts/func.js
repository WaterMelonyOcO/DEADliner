const addBtn = document.querySelector("#addTaskBtn");
const content = document.querySelector("#content");


function addTask() {
  let id = 0;
  let name = document.querySelector("#TaskName");
  let time = document.querySelector("#deadline");
  console.log(name.value, time.value);
  let cr = todo.add(name.value, time.value);
  if( cr ) content.appendChild(new TaskItem(id, name.value, time.value))
  id++;
  name.value = "";
}

addBtn.addEventListener("click", addTask);
