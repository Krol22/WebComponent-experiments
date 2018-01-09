import { TodoService } from './TodoService.js';
import { EventAggregator } from './EventAggregator.js';

export class ListComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <style>
                #todo-list {
                    position: relative;
                }

                @keyframes slide-down {
                    0% { top: -55px; }
                    100% { top: 0px; }
                }
 
                @keyframes slide-up {
                    0% { top: 0px; }
                    100% { top: -55px; }
                }

                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                @keyframes fade-out {
                    0% { opacity: 1; }
                    100% { opacity: 0; }
                }

                .animate-list-added {
                    animation-name: slide-down;
                    animation-duration: 0.5s;
                }

                .animate-list-removed {
                    animation-name: slide-up;
                    animation-duration: 0.5s;
                }
                
                .animate-new-element {
                    animation-name: fade-in;
                    animation-duration: 0.5s;
                }

                .animate-remove-element {
                    animation-name: fade-out;
                    animation-duration: 0.5s;
                }


            </style>
            <div class="list" id="todo-list"></div>
        `;
        this._todos = [];
    }

    connectedCallback() {
        this._shadowRoot = this.attachShadow({ mode: 'open' });

        this._shadowRoot.innerHTML = this.template;

        this.list = this._shadowRoot.querySelector('#todo-list');
        this._todos = TodoService.getTodos();
        this.render();

        EventAggregator.subscribe('TodoList:change', (newItem) => {
            this._todos = TodoService.getTodos();
            if(newItem) {
                this.addItem(newItem);
            } 
        });

        this.addEventListener('removeListItem', this.removeItem); 

        this.list.addEventListener('animationend', () => {
            this.list.classList.remove('animate-list-added');
            this.list.childNodes.forEach((child) => {
                child.classList.remove('animate-list-removed');
            });
            this.render();
        });
    }

    disconnectedCallback() {

    }

    addItem(newItem) {
        var newItemNode = document.createElement('item-component');
        this.list.insertBefore(newItemNode, this.list.firstChild);

        newItemNode.item = newItem;

        this.list.classList.add('animate-list-added');
        newItemNode.classList.add('animate-new-element');

    }

    removeItem(event) {
        var itemToRemove = event.detail.hostelement;
        var itemId = itemToRemove.item.id;

        this.animateItemUnderRemovedOne(event.detail.hostelement);

        itemToRemove.classList.add('animate-remove-element');
        TodoService.removeTodo(itemId);
    }

    animateItemUnderRemovedOne(itemToRemove) {
        var i = 0;
        while((itemToRemove = itemToRemove.previousSibling) != null ) {
            i++;
        }

        for(var j = i; j < this.list.childNodes.length; j++) {
            this.list.childNodes[j].classList.add('animate-list-removed');
        }
    }

    render() {
        this.list.innerHTML = '';

        this._todos
            .sort((itemA, itemB) => {
                return itemB.id - itemA.id;
            })
            .forEach((item) => {
                var newItemNode = document.createElement('item-component');
                this.list.appendChild(newItemNode);
                newItemNode.item = item;
            });
    }

    get todos() {
        return this._todos;
    }

    set todos(newValue) {
        this._todos = newValue;
        this.render();
    }

}
