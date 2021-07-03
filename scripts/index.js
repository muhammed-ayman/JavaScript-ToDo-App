import {paginate,showPage} from './pagination.js';

// CONSTANTS ::
const elementsPerPage = 5;
const tableId = 'todo-content-table';
const paginationUlId = 'todo-pagination-ul';

// INITIATE ::
paginate(tableId,elementsPerPage);
showPage('1',tableId);
