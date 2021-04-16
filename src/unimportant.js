import Task from './basic';
import {unimportantStore} from './store';


export default class unimportantTask extends Task {
    create(li, Trash) {
        super.create(li, Trash)
        li.setAttribute('data-unimportant', unimportantStore.length);
        document.querySelector('div[data-action="unimportant"] ul').append(li);


        this.id = unimportantStore.length;


        unimportantStore.push(this);
        
        
        
    }
}