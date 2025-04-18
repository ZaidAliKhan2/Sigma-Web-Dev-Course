let MainContainer = document.querySelector(".MainContainer");
let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");

function addTasks(task) {
    if(task != ""){
        let taskContainer = document.createElement("div");
        let span = document.createElement("span");
        span.innerHTML = task;
        taskContainer.classList.add("taskContainer");
    
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");

        let remove = document.createElement("button");
        remove.innerHTML = "x";
        remove.classList.add("removeBtn");
    
        checkbox.addEventListener("change", function () {
            let span = taskContainer.querySelector("span"); 
            if (checkbox.checked) {
                span.style.textDecoration = "line-through";
            } else {
                span.style.textDecoration = "none"; 
            }
        });

        remove.addEventListener("click",()=>{
            taskContainer.remove();
            removeTask(task);
        });
       
        taskContainer.prepend(checkbox);
        taskContainer.appendChild(span);
        taskContainer.appendChild(remove);
        MainContainer.appendChild(taskContainer);
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    tasks.push(task); 
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTasks(task)); 
}

document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", () => {
    let task = input.value.trim();
    if (task !== "") {
        saveTask(task);  
        input.value = "";
    }
    addTasks(task);
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let task = input.value.trim();
        if (task !== "") {
            saveTask(task); 
            input.value = "";
        }
        addTasks(task);
    }
   
});

console.log(localStorage.getItem("tasks"));
