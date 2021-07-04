// REMOVE ALL PAGINATION BUTTONS ::
export const removePaginationBtns = () => {
  let rows = document.querySelectorAll('#todo-pagination-ul > li');
  for (var i = 0; i < rows.length; i++) {
    rows[i].remove();
  }
}

// REMOVE ALL PAGES ::
export const removePages = (todoItemSelector) => {
  let rows = document.querySelectorAll(`${todoItemSelector}`);
  for (var i = 0; i < rows.length; i++) {
    rows[i].style.display = 'none';
  }
}

// SHOW A SPECIFIC PAGE ::
export const showPage = (pageId,todoItemSelector) => {
  removePages(todoItemSelector);
  let pageRows = document.getElementsByClassName(`${pageId}`);
  for (var i = 0; i < pageRows.length; i++) {
    pageRows[i].style.display = '';
  }
}

// ADD PAGINATION BUTTONS ::
export const addPaginationBtn = (btnId, todoItemSelector) => {
  let paginationUl = document.getElementById('todo-pagination-ul');
  let newLi = document.createElement('li');
  let newLiBtn = document.createElement('button');
  newLiBtn.setAttribute('value',btnId);
  newLiBtn.innerHTML = btnId;
  newLiBtn.addEventListener("click", function() {
    showPage(this.innerHTML, todoItemSelector);
  });
  newLi.appendChild(newLiBtn);
  paginationUl.appendChild(newLi);
}

// THE GENERAL PAGINATION FUNCTION ::
export const paginate = (todoItemSelector, elementsPerPage) =>{
  removePaginationBtns();
  let rows = document.querySelectorAll(`${todoItemSelector}`);
  let counter = 0;
  let id = 1;
  for (var i = 0; i < rows.length; i++) {
    if(counter === elementsPerPage){
      addPaginationBtn(id, todoItemSelector);
      counter = 0;
      id += 1;
    }
    rows[i].className = `todo-item ${id}`;
    counter += 1;
  }
  (counter !=0 && id != 1) ? addPaginationBtn(id, todoItemSelector) : 0;
}
