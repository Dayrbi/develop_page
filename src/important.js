import Task from './basic';
import {importantStore} from './store';

export default class importantTask extends Task {
    create(li, Trash) {
        super.create(li, Trash)
        li.setAttribute('data-important', importantStore.length);
        document.querySelector('div[data-action="important"] ul').append(li);


        this.id = importantStore.length;


        importantStore.push(this);
        
        
    }
}