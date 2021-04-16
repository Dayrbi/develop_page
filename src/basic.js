export default class Task {
    constructor(name, checked = false){
        this.name = name;
        this.checked = checked;
    }

    create(li, Trash) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const liContent = document.createElement('span');
        liContent.textContent = this.name;

        const deleteTask = document.createElement('img');
        deleteTask.src = Trash;
        deleteTask.classList.add('delete');
        deleteTask.setAttribute('title', "Удалить задачу");
        
        li.append(checkbox);
        li.append(liContent);
        li.append(deleteTask);
    }
}