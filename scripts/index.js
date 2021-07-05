import {paginate,showPage, removePaginationBtns} from './pagination.js';

// CONSTANTS ::
const elementsPerPage = 4;
const paginationUlId = 'todo-pagination-ul';
const todoItemSelector = '.todo-item';
const todoInput = document.getElementById('todo-input');
const todoBtn = document.getElementById('todo-btn');
const todoList = document.getElementsByClassName('todo-list')[0];
const trashBtns = document.getElementsByClassName('trash-btn');

// GENERAL VARIABLES ::
let tasks = {"completed":[],"uncompleted":[]}
let currentFilter = 'all';
window.tasks = tasks;

// INITIATE ::
paginate(todoItemSelector,elementsPerPage);
showPage('1',todoItemSelector);

// EVENTS ::
todoBtn.addEventListener('click', getTodoInput);

// FUNCTIONS ::
function emptyTodoInput() {
  todoInput.value = '';
}

function emptyTasksList() {
  todoList.innerHTML = '';
}

function addTask(todo) {
  const todoItemDiv = document.createElement('div');
  todoItemDiv.setAttribute('class', 'todo-item');
  const todoItemLi = document.createElement('li');
  todoItemLi.innerHTML = todo;
  const todoItemCheckBtn = document.createElement('button');
  todoItemCheckBtn.setAttribute('class','check-btn');
  todoItemCheckBtn.innerHTML = '<li class="fa fa-check"></li>';
  const todoItemTrashBtn = document.createElement('button');
  todoItemTrashBtn.setAttribute('class','trash-btn');
  todoItemTrashBtn.innerHTML = '<li class="fa fa-trash"></li>';
  todoItemTrashBtn.addEventListener('click', function() {
    deleteTask(event);
  });
  todoItemDiv.appendChild(todoItemLi);
  todoItemDiv.appendChild(todoItemCheckBtn);
  todoItemDiv.appendChild(todoItemTrashBtn);
  todoList.insertBefore(todoItemDiv, todoList.childNodes[0]);
  paginate(todoItemSelector,elementsPerPage);
  showPage('1',todoItemSelector);
}

function deleteTask(e) {
  for (var i = 0; i < todoList.childNodes.length; i++) {
    if (todoList.childNodes[i] == e.target.parentNode) {
      tasks['uncompleted'].splice(tasks['uncompleted'].length-1-i,1);
      e.target.parentNode.remove();
      paginate(todoItemSelector,elementsPerPage);
      showPage('1',todoItemSelector);
    }
  }
}

function changeFilter(filter) {
  emptyTasksList();
  if (filter == 'all') {
    let uncompletedArrLength = tasks['uncompleted'].length;
    let completedArrLength = tasks['completed'].length;
    for (var i = 0; i < completedArrLength; i++) {
      addTask(tasks['completed'][i]);
    }
    for (var i = 0; i < uncompletedArrLength; i++) {
      addTask(tasks['uncompleted'][i]);
    }
  } else if (filter == 'uncompleted'){
    for (var i = 0; i < uncompletedArrLength; i++) {
      addTask(tasks['uncompleted'][i]);
    }
  } else {
    for (var i = 0; i < completedArrLength; i++) {
      addTask(tasks['completed'][i]);
    }
  }
}

function getTodoInput() {
  if (todoInput.value.trim().length > 0){
    tasks['uncompleted'].push(todoInput.value.trim());
    emptyTodoInput();
  }
  if (currentFilter != 'uncompleted') {
    changeFilter('all');
  } else {
    changeFilter('uncompleted');
  }
}
