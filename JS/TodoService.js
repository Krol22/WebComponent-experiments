import { EventAggregator } from './EventAggregator.js';

export var TodoService = {
    id: 1129,
    todos: 
    [
        {
            id: 1123,
            text: 'test',
            checked: false,
        }, 
        {
            id: 1124,
            text: 'test2',
            checked: true,
        }, 
        {
            id: 1125,
            text: 'test3',
            checked: true,
        }, 
        {
            id: 1126,
            text: 'test4',
            checked: false,
        }, 
        {
            id: 1127,
            text: 'test5',
            checked: false,
        }, 
        {
            id: 1128,
            text: 'test6',
            checked: false,
        }
    ],
    getTodos: function() {
        return this.todos;
    },
    setTodos: function(newTodos) {
        this.todos = newTodos;
        EventAggregator.publish('TodoList:change');
    },
    addTodo: function(newTodoText) {
        var newTodoItem = {
            id: this.id++,
            text: newTodoText
        }
        this.todos.push(newTodoItem);
        EventAggregator.publish('TodoList:change', newTodoItem);
    }, 
    updateTodo: function(updatedTodo) {
        var itemToUpdate = this.todos.find(function(item) {
            return item.id === updatedTodo.id;
        });

        itemToUpdate.text = updatedTodo.text;
        itemToUpdate.checked = updatedTodo.checked;
    },
    removeTodo: function(id) {
        var index = this.todos.findIndex(function(todo) {
            return todo.id === id;
        });
        this.todos.splice(index, 1);
        EventAggregator.publish('TodoList:change');
    }
}