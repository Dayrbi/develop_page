import veryimportantTask from './veryimportant';
import Trash from './icons8-delete-trash-24.png';
import importantTask from './important';
import unimportantTask from './unimportant';
import {unimportantStore, importantStore, veryimportantStore} from './store';


export function showForm(event) {
    
    let action = event.target.dataset.action;
    

    if (!action) return;
    let div = document.querySelector(`div[data-action = ${action}]`);
    let input = document.querySelectorAll(`div[data-action = ${action}] input`);
    if(input.length == 0) return;
    
    if(div.hasAttribute("show") === true){
        div.removeAttribute("show");
        for(let i = 0; i < input.length; i++){
            if(input[i].checked === false) {
                input[i].parentElement.classList.add("hide");

            }
        }
            
        }

    else {
        input.forEach(el => el.parentElement.classList.remove("hide"));
        div.setAttribute("show", "");
    }

}
export function openOverlay(event) {
    if(event.target.classList.contains("AddButton") !== true){
        return;
    }

    console.log('open overlay');

    event.target.setAttribute('data-img', event.target.parentElement.dataset.action);

    let overlay = document.querySelector('div.overlay');
    overlay.style.display = "flex";

    setTimeout((() => overlay.style.opacity = 0.7),0);
    
    


}
export function closeOverlay(event) {
    
    if(event.target.classList.contains("deleteIcon") !== true){
        return;
    }
    console.log("close Overlay");

    let overlay = document.querySelector('div.overlay');

    overlay.style.opacity = 0;

    setTimeout((() => overlay.style.display = "none"),1000);

    
    document.querySelectorAll('img.AddButton').forEach((el) => el.removeAttribute('data-img'));

    document.querySelector('form').elements.task.value = "";


}

function closeOverlayandSubmit() {
    let overlay = document.querySelector('div.overlay');

    overlay.style.opacity = 0;

    setTimeout((() => overlay.style.display = "none"),1000);

    document.querySelectorAll('img.AddButton').forEach((el) => el.removeAttribute('data-img'));
    
}

export function AddTask(event) {
    event.preventDefault();
    console.log("add task");

    let value = event.target.elements.task.value;
    let valueUp = value[0].toUpperCase() + value.slice(1);

    let li = document.createElement('li');

    let allStore = [...unimportantStore, ...importantStore, veryimportantStore];

    
    for(let i = 0; i < allStore.length; i++){

        let arrValue = allStore[i].name;
        
        if(value.trim() == "" || arrValue == valueUp ){
            let span = document.createElement('span');
            let br = document.createElement('br');
    
            span.textContent = "Нельзя создать пустую или повторяющуюся задачу";
    
            event.target.append(br);
            event.target.append(span);
    
            event.target.elements.task.value = "";
    
            setTimeout((() => {
                span.remove();
                br.remove();
            }),4000);
            return;
        }
    }
    


    let arr = document.querySelectorAll('img.AddButton');
    for(let i = 0; i < arr.length; i++){
        if(arr[i].dataset.img == "veryimportant"){

            new veryimportantTask(valueUp).create(li, Trash);

            closeOverlayandSubmit();

            event.target.elements.task.value = "";
            
        }
       else if(arr[i].dataset.img == "important"){
            
            new importantTask(valueUp).create(li, Trash);

            closeOverlayandSubmit();

            event.target.elements.task.value = "";
            
        }
        else if(arr[i].dataset.img == "unimportant"){
            
            new unimportantTask(valueUp).create(li, Trash);

            closeOverlayandSubmit();

            event.target.elements.task.value = "";

            
            
        }
    }
    changeLocal();
}
export function deleteTask(event) {
    if(event.target.classList.contains("delete") !== true){
        return;
    }
    console.log("delte Task");

    event.target.parentElement.remove();


    
    if(event.target.parentElement.hasAttribute('data-unimportant') == true){
        console.log(unimportantStore);

        let num = event.target.parentElement.getAttribute('data-unimportant');
    
        unimportantStore.splice(num, 1);

        

        for(let i = num; i < unimportantStore.length; i++ ){

            unimportantStore[i].id -= 1;

            console.log(unimportantStore);
        }

    }
    else if(event.target.parentElement.hasAttribute('data-important') == true){
        console.log(importantStore);

        let num = event.target.parentElement.getAttribute('data-important');
    
        importantStore.splice(num, 1);

        for(let i = num; i < importantStore.length; i++ ){

            importantStore[i].id -= 1;
            
            console.log(importantStore);
        }

    }
    else if(event.target.parentElement.hasAttribute('data-veryimportant') == true){
        console.log(veryimportantStore);

        let num = event.target.parentElement.getAttribute('data-veryimportant');
    
        veryimportantStore.splice(num, 1);

        for(let i = num; i < veryimportantStore.length; i++ ){

            veryimportantStore[i].id -= 1;
            
            console.log(veryimportantStore);
        }

    }
    changeLocal();
}
export function markTask(event) {
    if(event.target.type !== "checkbox"){
        return
    }
    
    console.log("mark Task");

    let num_unimport = event.target.parentElement.getAttribute('data-unimportant');
    let num_import = event.target.parentElement.getAttribute('data-important');
    let num_veryimport = event.target.parentElement.getAttribute('data-veryimportant');


    if(event.target.parentElement.hasAttribute('data-unimportant') == true){
        console.log(unimportantStore);

        event.target.checked === true ? unimportantStore[num_unimport].checked  = true : unimportantStore[num_unimport].checked = false;

        console.log(unimportantStore);
        
    }
    else if(event.target.parentElement.hasAttribute('data-important') == true){
        console.log(importantStore);

        event.target.checked === true ? importantStore[num_import].checked = true : importantStore[num_import].checked = false;
        console.log(importantStore);
    }
    else if(event.target.parentElement.hasAttribute('data-veryimportant') == true){
        console.log(veryimportantStore);

        event.target.checked === true ? veryimportantStore[num_veryimport].checked = true : veryimportantStore[num_veryimport].checked = false;
        console.log(veryimportantStore);
    }

    changeLocal();

}
 function changeLocal () {

    let ulArr = document.querySelectorAll('ul');

    for(let i = 0; i < ulArr.length; i++){

        if(ulArr[i].parentElement.dataset.action == "unimportant"){
            localStorage.setItem('unimportantList', ulArr[i].innerHTML);
            localStorage.setItem('unimportantStore', JSON.stringify(unimportantStore));
        }
        else if(ulArr[i].parentElement.dataset.action == "important"){
            localStorage.setItem('importantList', ulArr[i].innerHTML);
            localStorage.setItem('importantStore', JSON.stringify(importantStore));
        }
        else if(ulArr[i].parentElement.dataset.action == "veryimportant"){
            localStorage.setItem('veryimportantList', ulArr[i].innerHTML);
            localStorage.setItem('veryimportantStore', JSON.stringify(veryimportantStore));
        }
    }
}
export function getLocal () {
    console.log("rebase")
    let ulArr = document.querySelectorAll('ul');

    for(let i = 0; i < ulArr.length; i++){

        if(ulArr[i].parentElement.dataset.action == "unimportant"){

            ulArr[i].innerHTML = localStorage.getItem('unimportantList');
            let el = JSON.parse(localStorage.getItem('unimportantStore'));
            unimportantStore.push(...el);
            for(let i = 0; i < unimportantStore.length; i++){
                if(unimportantStore[i].checked == true){
                    document.querySelector(`li[data-unimportant = "${i}"] input`).setAttribute('checked', 'checked');
                    
                }
                else {
                    document.querySelector(`li[data-unimportant = "${i}"] input`).removeAttribute('checked', 'checked');
                }
            }
           
        }
        else if(ulArr[i].parentElement.dataset.action == "important"){

            ulArr[i].innerHTML = localStorage.getItem('importantList');
            let el = JSON.parse(localStorage.getItem('importantStore'));
            importantStore.push(...el);

            for(let i = 0; i < importantStore.length; i++){
                if(importantStore[i].checked == true){
                    document.querySelector(`li[data-important = "${i}"] input`).setAttribute('checked', 'checked');
                    
                }
                else {
                    document.querySelector(`li[data-important = "${i}"] input`).removeAttribute('checked', 'checked');
                }
            }
        }
        else if(ulArr[i].parentElement.dataset.action == "veryimportant"){

            ulArr[i].innerHTML = localStorage.getItem('veryimportantList');
            let el = JSON.parse(localStorage.getItem('veryimportantStore'));
            veryimportantStore.push(...el);

            for(let i = 0; i < veryimportantStore.length; i++){
                if(veryimportantStore[i].checked == true){
                    document.querySelector(`li[data-veryimportant = "${i}"] input`).setAttribute('checked', 'checked');
                    
                }
                else {
                    document.querySelector(`li[data-veryimportant = "${i}"] input`).removeAttribute('checked', 'checked');
                }
            }
        }
    }
}

