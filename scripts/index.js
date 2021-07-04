import {paginate,showPage, removePaginationBtns} from './pagination.js';

// CONSTANTS ::
const elementsPerPage = 4;
const paginationUlId = 'todo-pagination-ul';
const todoItemSelector = '.todo-item';
const todoInput = document.getElementById('todo-input');
const todoBtn = document.getElementById('todo-btn');
const todoList = document.getElementsByClassName('todo-list')[0];
const trashBtns = document.getElementsByClassName('trash-btn');

// INITIATE ::
paginate(todoItemSelector,elementsPerPage);
showPage('1',todoItemSelector);

// EVENTS ::
todoBtn.addEventListener('click', addTask);

// FUNCTIONS ::

function emptyTodoInput() {
  todoInput.value = '';
}

function addTask() {
  if (todoInput.value.trim().length > 0) {
    const todoItemDiv = document.createElement('div');
    todoItemDiv.setAttribute('class', 'todo-item');
    const todoItemLi = document.createElement('li');
    todoItemLi.innerHTML = todoInput.value.trim();
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
    emptyTodoInput();
  } else{
    return;
  }
}

function deleteTask(e) {
  e.target.parentNode.remove();
  paginate(todoItemSelector,elementsPerPage);
  showPage('1',todoItemSelector);
}
