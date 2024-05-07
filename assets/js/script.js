// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const submit = $('.btn-primary');
const titleInput = $('#title-of-task');
const dateInput = $('#datepicker');
const taskInput = $('#task-text');
const taskForm = $('#task-form');
const addTask = $('#addTask');


// Todo: create a function to generate a unique task id
function generateTaskId() {

    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
  do {
    var ascicode = Math.floor((Math.random() * 42) + 48);
    if (ascicode < 58 || ascicode > 64) {
      idstr += String.fromCharCode(ascicode);
    }
  } while (idstr.length < 32);

  return (idstr);
}
console.log(generateTaskId());


// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('<div>')
    .addClass('card draggable my-3')
    .attr('data-task-id', task.id)
  const cardHeader = $('<h5>').addClass('card-header').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.text);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBt = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id)
  cardDeleteBt.on('click', handleDeleteTask);

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBt.addClass('btn-outline-warning');
    }
  }

  cardBody.append(cardDescription, cardDueDate, cardDeleteBt);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
  
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const taskList = pullTasks();

  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }
  
  $('.draggable').draggable({
    opacity: 0.5,
    zIndex: 75,

  });
}


// Todo: create a function to handle adding a new task
addTask.on('click', handleAddTask);

function handleAddTask(event) {
  event.preventDefault();

  const taskTitle = titleInput.val().trim();
  const taskDate = dateInput.val();
  const taskText = taskInput.val().trim();

  let newTask = {

    id: generateTaskId(),
    title: taskTitle,
    text: taskText,
    dueDate: taskDate,
    status: 'to-do',

  };

  const taskList = pullTasks();
  taskList.push(newTask);

  pushTasks(taskList);
  
  renderTaskList();

  titleInput.val('');
  dateInput.val('');
  taskInput.val('');

}

function pullTasks() {
  let taskList = JSON.parse(localStorage.getItem('tasks'));

    if (!taskList) {
        taskList = [];
    }
    return taskList;
}

function pushTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask() {
  const taskId = $(this).data('task-id');
  let taskList = pullTasks();
  taskList = taskList.filter(task => task.id !== taskId);
  pushTasks(taskList);
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  event.preventDefault();

  const taskList = pullTasks();
  const taskId = ui.helper.attr('data-task-id');
  const newStatus = event.target.id;

  for (let task of taskList) {
    if (task.id == taskId) {
        task.status = newStatus;
    }
  }

  pushTasks(taskList);
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  renderTaskList();


  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

});