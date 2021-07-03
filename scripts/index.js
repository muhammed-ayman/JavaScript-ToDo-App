import {paginate,showPage, removePaginationBtns} from './pagination.js';

// CONSTANTS ::
const elementsPerPage = 6;
const tableId = 'todo-content-table';
const paginationUlId = 'todo-pagination-ul';
const todoInput = document.getElementById('todo-input');
const todoBtn = document.getElementById('todo-btn');
const contentTable = document.getElementById(tableId).getElementsByTagName('tbody')[0];

// INITIATE ::
paginate(tableId,elementsPerPage);
showPage('1',tableId);

// EVENTS ::
todoBtn.addEventListener('click', addTask)

function addTask() {
  if (todoInput.value.trim().length > 0) {
    const tableTr = document.createElement('tr');
    const firstTd = document.createElement('td');
    const secondTd = document.createElement('td');
    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.name = 'task-delete';
    taskDeleteBtn.innerHTML = '<i class="fa fa-remove"></i>';
    firstTd.innerHTML = todoInput.value.trim();
    secondTd.appendChild(taskDeleteBtn);
    tableTr.appendChild(firstTd);
    tableTr.appendChild(secondTd);
    contentTable.insertBefore(tableTr, contentTable.childNodes[0]);
    paginate(tableId,elementsPerPage);
    showPage('1',tableId);
  } else{
    return;
  }
}
