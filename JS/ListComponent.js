import { TodoService } from './TodoService.js';
import { EventAggregator } from './EventAggregator.js';

export class ListComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <style>

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
            } else {
                this.render();
            }
        });


        this.addEventListener('removeListItem', this.removeItem); 
    }

    disconnectedCallback() {

    }

    addItem(newItem) {
        var newItemNode = document.createElement('item-component');
        this.list.insertBefore(newItemNode, this.list.firstChild);
        this.list.childNodes.forEach((node) => {
            node.style.transition = 'none';
            node.style.top = '-55px';
        });
        newItemNode.style.opacity = '0';
        newItemNode.item = newItem;

        setTimeout(() => {
            this.list.childNodes.forEach((node) => {
                node.style.transition = 'all 0.3s ease';
            });

            this.list.childNodes.forEach((node) => {
                node.style.top = '0';
            });
            newItemNode.style.opacity = '1';
        }, 0);
    }

    removeItem(event) {
        var itemToRemove = event.detail.hostelement;
        var itemId = itemToRemove.item.id;

        var ended = false;

        this.animateItemUnderRemovedOne(event.detail.hostelement);

        itemToRemove.style.top = '-55px';
        itemToRemove.style.opacity = '0';
        itemToRemove.addEventListener('transitionend', (e) => {
            if(ended) {
                return;
            }

            ended = true;
            TodoService.removeTodo(itemId);
        });
    }

    animateItemUnderRemovedOne(itemToRemove) {
        var i = 0;
        while((itemToRemove = itemToRemove.previousSibling) != null ) {
            i++;
        }

        for(var j = i; j < this.list.childNodes.length; j++) {
            this.list.childNodes[j].style.top = '-55px';
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
