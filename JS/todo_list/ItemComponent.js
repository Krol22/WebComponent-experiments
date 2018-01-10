import { TodoService } from './TodoService.js';

export class ItemComponent extends HTMLElement {

    static get observedAttributes() { return ['item']; }

    constructor() {
        super();
        this.template = `
            <style>
                :host {
                    display: none;
                    position: relative;
                    border: 1px solid black;
                    padding: 13px;
                    justify-content: space-between;
                    margin: 10px 0;
                    opacity: 1;

                    user-select: none;
                }

                .done-checkbox {
                    flex: 1;
                }

                .text-span {
                    flex: 10;
                }

                .btn-remove {
                    z-index: 1;
                    cursor: pointer;
                    flex: 1;
                }

                .checked {
                    border: 1px solid green;
                }
            </style>

            <input class='done-checkbox' type='checkbox'/>
            <span class='text-span' id='item-text'> </span>
            <div class='btn-remove'> X </div>
        `;
    }

    connectedCallback() {
        this._shadowRoot = this.attachShadow({ mode: 'open' });

        this._shadowRoot.innerHTML = this.template;
        this.itemTextSpan = this._shadowRoot.querySelector('#item-text');
        this.button = this._shadowRoot.querySelector('.btn-remove');
        this.checkbox = this._shadowRoot.querySelector('.done-checkbox');

        this._shadowRoot.host.style.display = 'flex';
        this._shadowRoot.host.style.top = '0px';


        this.button.addEventListener('click', () => {
            this.removeItemEvent = new CustomEvent(
                'removeListItem', 
                {
                    bubbles: false,
                    composed: true,
                    detail: {
                        hostelement: this._shadowRoot.host,
                        itemId: this._item.id,
                    }
                }
            );
            this.dispatchEvent(this.removeItemEvent);    
        });

        this.checkbox.addEventListener('change', (e) => {
            // here i have problem with checked class... :/
            this.classList.add('checked');
            this._item.checked = this.checkbox.checked;
            TodoService.updateTodo(this._item);

            if(this.checkbox.checked) {
            } else {
            }
        });

    }

    disconnectedCallback() {

    }

    render() {
        this.itemTextSpan.innerHTML = this._item.text;
    }

    set item(newValue) {
        this._item = newValue;
        this.checkbox.checked = this._item.checked;
        this.render();
    }

    get item() {
        return this._item;
    }

}