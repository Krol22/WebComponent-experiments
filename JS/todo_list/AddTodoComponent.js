import { TodoService } from './shared/TodoService.js';

export class AddTodoComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <style>
                :host {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                .input {
                    padding: 0 10px;
                    font-size: 1.5em;
                    flex: 4;
                }

                .button {
                    border: 1px solid black;
                    text-align: center;
                    cursor: pointer;
                    display: inline-block;
                    padding: 10px 0;
                    font-size: 1.2em;
                    flex: 1;
                }
            </style>

            <input class="input" id="new-item-input" type="text" placeholder="New item" required/>
            <div class="button"> + </div>
        `;
    }

    connectedCallback() {
        this._shadowRoot = this.attachShadow({ mode: 'open' });

        this._shadowRoot.innerHTML = this.template;

        this.addButton = this._shadowRoot.querySelector('.button');
        this.addButton.addEventListener('click', this.addTodo.bind(this)); 

        this.newItem = this._shadowRoot.querySelector('#new-item-input');
    }

    addTodo() {
        if(this.newItem.value) {
            TodoService.addTodo(this.newItem.value);
            this.newItem.value = '';
        }
    }

    disconnectedCallback() {
    }
}