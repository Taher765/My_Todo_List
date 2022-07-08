let inputText = document.querySelector("#input-text");
let btnAddTask = document.querySelector("#btn-task");
let containerTasks = document.querySelector(".tasks");
let create = true;
let updateIndex = ""
let tasksFromArr = [];

btnAddTask.addEventListener("click", addTask);

// main Function
function addTask() {
  const date = new Date();

  let tasks = {
    title: inputText.value,
    // مش اصح حاجه بس اختصارا للوقت وهبقي ارجع اخليها لوحدها بدل العجن دا
    date: `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      } | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    completed: false,
  };
  checkEmpty(tasks)
  displayDlelteAll();
  display();
  clear()
  console.log(tasksFromArr);
}

function checkEmpty(tasks) {
  if (inputText.value != "") {
    if (create) {
      tasksFromArr.push(tasks);
    } else {
      tasksFromArr[updateIndex] = tasks;
      create = true;
      btnAddTask.innerHTML = "Add Task"
    }
  }
}

// clear Input 
function clear() {
  inputText.value = ""
}

// function Display

function display() {
  let content = ``;
  tasksFromArr.forEach((ele, index) => {
    content += `
     <div class="task p-2 mb-1 rounded d-flex align-items-center justify-content-between">
     <span class="p-1 me-2 bg-warning rounded-pill">${index + 1}</span>
   <div class="info">
     <div class="task-title">${ele.title}</div>
     <small class="date text-black-50">${ele.date}</small>
   </div>
   <div class="holder-btn d-flex gap-3">
     <button onclick="deleteTask(${index})" id="delete" class="btn btn-danger rounded-pill">
       <i class="fa-solid fa-trash-can"></i>
     </button>
     <button onclick="completed(${index})" id="completed" class="btn btn-success rounded-pill">
       <i class="fa-solid fa-check"></i>
     </button>
     <button onclick="update(${index})" id="updet" class="btn btn-warning text-light rounded-pill">
       <i class="fa-solid fa-pen-to-square"></i>
     </button>
   </div>
 </div>
 `;
  });
  containerTasks.innerHTML = content;
}
// function Delete Task

function deleteTask(index) {
  let con = confirm("confirm Dlelte")
  if (con) {
    console.log(index);
    tasksFromArr.splice(index, 1);
    display();
  }
}

// Delete All

let btnDleAll = document.createElement("button");
function displayDlelteAll() {
  if (containerTasks.innerHTML != "") {
    btnDleAll.className = "btn btn-danger mt-3 w-100";
    btnDleAll.innerText = "Delete All";
    document.querySelector(".todo-list").appendChild(btnDleAll);
  }
}
// Function Delete All
btnDleAll.addEventListener("click", () => {
  tasksFromArr.splice(0, tasksFromArr.length);
  display();
  btnDleAll.remove();
});

// Function Update Task

function update(index) {
  console.log(index);
  updateIndex = index
  inputText.value = tasksFromArr[index].title;
  btnAddTask.innerHTML = "Update Task";
  create = false
}

// completed
function completed(index) {
  tasksFromArr[index].completed = true;
  console.log(tasksFromArr[index].completed)
}
