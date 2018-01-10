export var EventAggregator = {
    subscribers: {},
    subscribe: function(eventName, callback) {
        if(this.subscribers[eventName]) {
            this.subscribers[eventName].push(callback);
        } else {
            this.subscribers[eventName] = [ callback ];
        }
    },
    publish: function(eventName, ...args) {
        if(!this.subscribers[eventName]) {
            return;
        }

        this.subscribers[eventName]
            .forEach(function (callback){ 
                callback(...args);
            });
    }
}