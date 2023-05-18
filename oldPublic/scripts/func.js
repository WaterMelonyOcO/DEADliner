/* eslint-disable no-undef */

const addBtn = document.querySelector("#addTaskBtn");
const content = document.querySelector("#content");

handel.errorHadler((_, ...err) => { console.log(err); })
handel.exitHandler((_) => {
  console.log("запрос на закрытие");
  handel.exit()
})
handel.eventHandler((_) => { console.log("событие идёт в render") })
handel.addTaskTrayHandler((_)=>{ console.log("событие открытие диалога добавления");})

function addTask() {

  let name = document.querySelector("#TaskName");
  let time = document.querySelector("#deadline");
  let file = Object.values(document.querySelector("#data").files);
  let timeVal = time.value.split("T").join(" ");

  let cr = todo.add(name.value, time.value, null, file);
  if (cr) content.appendChild(new TaskItem(cr, name.value, timeVal, file.map((i) => i.name)))

  name.value = "";
  time.value = "";
}

function toComplite(id){
  todo.toCompTask(id)
}

function getcomplitedTask(){
  console.log(todo.getCompTask());
}

function openFile(e) {
  const nameFile = e.target.dataset.file;
  // console.log(nameFile);
  todo.openFile(nameFile);
}

function getTasks() {
  for (let i of todo.get()) {
    console.log(i);
    content.appendChild(new TaskItem(i.id, i.name, i.deadline, i.files))
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
/*здесь доделать таймер
// function timer(date){
//   let timeDiff = todo.timeDiff.fromISO(date).diffNow(["minutes","hours","days","months"]).values;

//   timeDiff.hours = Math.floor(timeDiff.hours)
//   timeDiff.minutes = Math.floor(timeDiff.minutes)

//   let formatedTime = `${timeDiff.months}-${timeDiff.days} ${timeDiff.hours}:${timeDiff.minutes}`
//   return formatedTime
// }
*/
function chNameListener(e) {
  const taskConteiner = e.target.parentNode.parentNode.querySelector(".taskName")
  const defaultName = taskConteiner.getAttribute("data-task-name")
  const editBtn = e.target.parentNode.querySelector(".editBtn")

  console.log(defaultName, e.target.value);
  if (defaultName !== e.target.value) { editBtn.disabled = false }

}


// window.Electron.ipcRenderer.on("Timer", ()=>{ таймер
//   const taskTimer = document.querySelector(".taskTimer")
//   const taskId = togo.get().filter((i)=>i.id === taskTimer.parentNode.id)
//   taskTimer.textContent = timer(taskTimer.parentNode.id)
// })

addBtn.addEventListener("click", addTask);
// todo.addHandl((taskName, deadline, description, files)=>{
//   content.appendChild(new TaskItem(cr, name.value, timeVal, files.map((i) => i.name)))
// })
getTasks()

// console.log("все теги");
// console.log(todo.getTegs());
// console.log("\n");

// console.log('создаю первый тег');
// let tt = todo.createTeg('some1', 'blue')

// console.log("добавляю первый тег в первое задание");
// todo.addTagToTask(1, tt)

// console.log("создаю второй тег");
// let t2 = todo.createTeg('some2', 'red')

// console.log("добавляю второй тег во второе задание");
// todo.addTagToTask(2, t2)

// console.log("все теги после добавления 2-х");
// console.log(todo.getTegs());

// console.log("все задания");
// console.log(todo.get());

// console.log("удалю 1 тег из 1-го задания");
// todo.removeTagFromTask(1, "some1")

// console.log("все задания");
// console.log(todo.get());

// console.log("все теги после удаления 1-го из 1-го задания");
// console.log(todo.getTegs());

// console.log("добвлю 1 тег во второе задание");
// todo.addTagToTask(2, tt)

// console.log("все задания");
// console.log(todo.get());

// console.log("удалю полностю тег 1");
// todo.removeTag(todo.getTeg('some1').id)

todo.createTegs([{name:"oskd", color: "d34545FFF",value: "value"},
{name:"os3kd", color: "d34545FFF",value: "value"},
{name:"osk4d", color: "d34545FFF",value: "value"},
{name:"o6skd", color: "d34545FFF",value: "value"},
])

console.log(todo.getTegs())