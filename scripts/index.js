// GENERAL CONSTANTS ::
const todoInput = document.getElementById('todo-input');
const todoInputButton = document.getElementById('todo-btn');
const tasksStatusSelect = document.getElementsByClassName('tasks-status')[0];
const todoList = document.getElementsByClassName('todo-list')[0];
const todoPaginationUl = document.getElementById('todo-pagination-ul');

// TODO CLASS ::
class Todo {
  constructor(uncompleted=[],completed=[]) {
    this.uncompleted = uncompleted;
    this.completed = completed;
    this.currentFitler = 'all';
  }
  addTaskToList(content) {
    this.uncompleted.push(content);
  }
  deleteTaskFromList(index,type) {
    this[type].splice(index,1);
  }
  addTaskToPage(index,type) {
    const todoItemDiv = document.createElement('div');
    todoItemDiv.setAttribute('class', 'todo-item');
    todoItemDiv.setAttribute('type', type);
    todoItemDiv.setAttribute('index', index);
    const todoItemLi = document.createElement('li');
    todoItemLi.innerHTML = this[type][index];
    todoItemDiv.appendChild(todoItemLi);
    if (type == 'uncompleted') {
      const todoItemCheckBtn = document.createElement('button');
      todoItemCheckBtn.setAttribute('class','check-btn');
      todoItemCheckBtn.innerHTML = '<li class="fa fa-check"></li>';
      todoItemCheckBtn.addEventListener('click',function() {
        todo.finishTask(index);
      });
      todoItemDiv.appendChild(todoItemCheckBtn);
    }
    const todoItemTrashBtn = document.createElement('button');
    todoItemTrashBtn.setAttribute('class','trash-btn');
    todoItemTrashBtn.innerHTML = '<li class="fa fa-trash"></li>';
    todoItemTrashBtn.addEventListener('click',function() {
      todo.removeTaskFromPage(index,type);
    });
    todoItemDiv.appendChild(todoItemTrashBtn);
    todoList.insertBefore(todoItemDiv, todoList.childNodes[0]);
  }
  removeTaskFromPage(index,type) {
    this.deleteTaskFromList(index,type);
    let toRemoveDiv = document.querySelectorAll(`div[index='${index}'][type='${type}']`)[0];
    toRemoveDiv.remove();
  }
  finishTask(index) {
    this.completed.push(this.uncompleted[index]);
    this.deleteTaskFromList(index,'uncompleted');
    this.addFilter(this.currentFitler);
  }
  removeTasksFromPage() {
    todoList.innerHTML = '';
  }
  addFilter(filter) {
    this.removeTasksFromPage();
    if (filter == 'all') {
      for (var i = 0; i < this.completed.length; i++) {
        this.addTaskToPage(i,'completed');
      }
      for (var i = 0; i < this.uncompleted.length; i++) {
        this.addTaskToPage(i,'uncompleted');
      }
    } else if (filter == 'uncompleted') {
      for (var i = 0; i < this.uncompleted.length; i++) {
        this.addTaskToPage(i,'uncompleted');
      }
    } else {
      for (var i = 0; i < this.completed.length; i++) {
        this.addTaskToPage(i,'completed');
      }
    }
  }
  convertIntoJSON() {
    let __json = {'uncompleted':this.uncompleted,'completed':this.completed};
    return __json;
  }
}

let todo = new Todo();
tasksStatusSelect.value = 'all';
todo.addFilter(todo.currentFitler);

// EVENTS ::
todoInputButton.addEventListener('click', function() {
  if (todoInput.value.trim().length > 0) {
    todo.addTaskToList(todoInput.value.trim());
    if (tasksStatusSelect.value == 'completed') {
      tasksStatusSelect.value = 'uncompleted';
      todo.addFilter('uncompleted');
    } else {
      todo.addTaskToPage(todo.uncompleted.length-1,'uncompleted');
    }
    todoInput.value = '';
  }
});

tasksStatusSelect.addEventListener('change', function() {
  todo.currentFitler = tasksStatusSelect.value;
  todo.addFilter(tasksStatusSelect.value);
});
