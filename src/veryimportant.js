import Task from './basic';
import {veryimportantStore} from './store';

export default class veryimportantTask extends Task {
    create(li, Trash) {
        super.create(li, Trash)
        li.setAttribute('data-veryimportant', veryimportantStore.length);
        document.querySelector('div[data-action="veryimportant"] ul').append(li);


        this.id = veryimportantStore.length;


        veryimportantStore.push(this);
        
        
    }
}