let input   = document.querySelector('.input');
let submit  = document.querySelector('.add');
let taskDiv = document.querySelector('.tasks'); 

// Empty Array To Store The Tasks
let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

getDataFromLS();

submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
}
taskDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains("del")) {
        // remove from the page
        e.target.parentElement.remove();
        // remove from the LS
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'));
    }
    if (e.target.classList.contains("task")) {
        // toggle Completed Task
        toggleTasksWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTasks.push(task);

    addElementsToPageFrom(arrayOfTasks);

    addDataToLS(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    // empty task div avoid repeating
    taskDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        // create main div
        let div = document.createElement('div');
        div.className = 'task';
        if (task.completed) {
            div.className = 'task done';
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);

        // add task to task container
        taskDiv.append(div);
    });
}

function addDataToLS(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLS() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLS(arrayOfTasks);
}
function toggleTasksWith(taskId) {
    arrayOfTasks.forEach((e) => {
        if (e.id == taskId) {
            e.completed == false ? (e.completed = true) : (e.completed = false);
        }
    })
    addDataToLS(arrayOfTasks);
}