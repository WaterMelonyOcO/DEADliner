const addBtn = document.querySelector("#addTaskBtn");
const content = document.querySelector("#content");


function addTask() {

  let name = document.querySelector("#TaskName");
  let time = document.querySelector("#deadline");
  
  let timeVal = time.value.split("T").join(" ")

  let cr = todo.add(name.value, time.value);
  if( cr ) content.appendChild(new TaskItem(cr, name.value, timeVal))

  name.value = "";
  time.value = "";
}

function convertTimr(time){
}

addBtn.addEventListener("click", addTask);
