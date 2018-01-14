import { TodoService } from './shared/TodoService.js';
import { EventAggregator } from '../shared/EventAggregator.js';

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

                @keyframes remove {
                    0% { 
                        top: 0px;
                        opacity: 1;
                    }
                    100% { 
                        top: -55px;
                        opacity: 0; 
                    }
                }

                .animate-list-added {
                    animation-name: slide-down;
                    animation-duration: 0.3s;
                }

                .animate-list-removed {
                    animation-name: slide-up;
                    animation-duration: 0.3s;
                }
                
                .animate-new-element {
                    animation-name: fade-in;
                    animation-duration: 0.3s;
                }

                .animate-remove-element {
                    animation-name: remove;
                    animation-duration: 0.3s;
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

        this.list.addEventListener('animationend', (e) => {
            this.list.classList.remove('animate-list-added');
            this.list.childNodes.forEach((child) => {
                child.classList.remove('animate-list-removed');
            });
            this.list.removeChild(this.list.childNodes[0]);
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

        TodoService.removeTodo(itemId);
    }

    animateItemUnderRemovedOne(itemToRemove) {
        var index = Array
            .from(this.list.childNodes)
            .findIndex((elem) => {
                return elem === itemToRemove;
            });

        itemToRemove.classList.add('animate-remove-element');
        for(var i = index + 1; i < this.list.childNodes.length; i++) {
            this.list.childNodes[i].classList.add('animate-list-removed');
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
