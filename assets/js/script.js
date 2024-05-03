// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

const toDo = $('#to-do')
const titleDo = $('<h3>')
const desDo = $('<p>')


// Todo: create a function to generate a unique task id
function generateTaskId() {
    const idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
    do {
      const ascicode = Math.floor(Math.random() * 42 + 48);
      if (ascicode < 58 || ascicode > 64) {
        idstr += String.fromCharCode(ascicode);
      }
    } while (idstr.length < 32);
  
    return idstr;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const $newdiv1 = $( "<div class='to-do'></div>" ),
    newdiv2 = document.createElement( "div" ),
    existingdiv1 = document.getElementById( "todo-cards" );
    
    $( "body" ).append( $newdiv1, [ newdiv2, existingdiv1 ] );
    }
console.log(generateTaskId());

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  
    
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const titleInput = document.querySelector('#title-of-task');
    const dateInput = document.querySelector('#datepicker');
    const taskInput = document.querySelector('#task-text');

    tasks.push({

      title: titleInput.value,
      date: dateInput.value,
      task: taskInput.value,

    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    createTaskCard();
}

submit.addEventListener('click', handleAddTask);

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const deleteButton = document.getElementById("button");
    deleteButton.textContent = "Delete";

    
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
