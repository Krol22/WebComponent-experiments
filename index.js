import { AddTodoComponent } from '/JS/AddTodoComponent.js';
import { ListComponent } from '/JS/ListComponent.js';
import { ItemComponent } from '/JS/ItemComponent.js';
import { ConnectionCheckerComponent } from '/JS/ConnectionCheckerComponent.js';

customElements.define('connection-checker-component', ConnectionCheckerComponent);
customElements.define('item-component', ItemComponent);
customElements.define('list-component', ListComponent);
customElements.define('add-todo-component', AddTodoComponent)