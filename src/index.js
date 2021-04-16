import {showForm, openOverlay, AddTask, closeOverlay, deleteTask, markTask, getLocal,}  from './actions';

import './style.css';

import add from './icons8-add-30.png';
import Trash from './icons8-delete-trash-24.png';
import Close from './icons8-delete-30.png';




const but_addTask = document.querySelectorAll('img.AddButton');
const form_task = document.querySelector('form.formTask');
const but_close = document.querySelector('img.deleteIcon');




but_addTask.forEach((el) =>  el.src = add);
but_close.src = Close;

window.onload = getLocal;

document.addEventListener('click', showForm);
document.addEventListener('click', openOverlay);
document.addEventListener('click', closeOverlay);
form_task.onsubmit = AddTask;
document.addEventListener('click', deleteTask);
document.addEventListener('click', markTask);





