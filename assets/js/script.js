// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 100000);
    const TaskId = `${timestamp}-${randomNum}`;
    return TaskId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    const taskContainer = document.getElementById('task-container');
    taskContainer.appendChild(taskCard);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const taskList = document.getElementById('task-container');
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
