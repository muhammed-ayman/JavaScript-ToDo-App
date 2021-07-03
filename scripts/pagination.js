// REMOVE ALL PAGES ::
export const removePages = (tableId) => {
  let rows = document.querySelectorAll(`#${tableId} > tbody > tr`);
  for (var i = 0; i < rows.length; i++) {
    rows[i].style.display = 'none';
  }
}

// SHOW A SPECIFIC PAGE ::
export const showPage = (pageId,tableId) => {
  removePages(tableId);
  let pageRows = document.getElementsByClassName(`${pageId}`);
  for (var i = 0; i < pageRows.length; i++) {
    pageRows[i].style.display = '';
  }
}

// ADD PAGINATION BUTTONS ::
export const addPaginationBtn = (btnId) => {
  let paginationUl = document.getElementById('todo-pagination-ul');
  let newLi = document.createElement('li');
  let newLiBtn = document.createElement('button');
  newLiBtn.setAttribute('value',btnId);
  newLiBtn.innerHTML = btnId;
  newLiBtn.addEventListener("click", function() {
    showPage(this.innerHTML,'todo-content-table');
  });
  newLi.appendChild(newLiBtn);
  paginationUl.appendChild(newLi);
}

// THE GENERAL PAGINATION FUNCTION ::
export const paginate = (tableId, elementsPerPage) =>{
  let rows = document.querySelectorAll(`#${tableId} > tbody > tr`);
  let counter = 0;
  let id = 1;
  for (var i = 0; i < rows.length; i++) {
    if(counter === elementsPerPage){
      addPaginationBtn(id);
      counter = 0;
      id += 1;
    }
    rows[i].setAttribute('class',id);
    counter += 1;
  }
  (counter !=0 && id != 1) ? addPaginationBtn(id) : False;
}
