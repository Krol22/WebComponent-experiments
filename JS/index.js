import { AddTodoComponent } from './todo_list/AddTodoComponent.js';
import { ListComponent } from './todo_list/ListComponent.js';
import { ItemComponent } from './todo_list/ItemComponent.js';
import { ConnectionCheckerComponent } from './todo_list/ConnectionCheckerComponent.js';

customElements.define('connection-checker-component', ConnectionCheckerComponent);
customElements.define('item-component', ItemComponent);
customElements.define('list-component', ListComponent);
customElements.define('add-todo-component', AddTodoComponent)

