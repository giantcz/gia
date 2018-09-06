
/**
 * Event bus for storing and executing handlers on emitted events
 */

class EventBus {

    list = {};

    emit(event, eventObject = {}) {
        eventObject._name = event;
        if (this.list[event]) {
            console.info(`${this.list[event].length} handler${this.list[event].length > 1 ? "s" : ""} called on event '${event}'`);
            this.list[event].forEach(handlerObject => {
                handlerObject.handler(eventObject);
                if (handlerObject.once) {
                    this.off(event, handlerObject.handler);
                }
            });
        } else {
            console.info(`0 handlers called on event '${event}'`);
        }
    }

    on(event, handler, once = false) {
        if (this.list[event]) {
            this.list[event].push({once: once, handler: handler});
        } else {
            this.list[event] = [];
            this.list[event].push({once: once, handler: handler});
        }
    }

    once(event, handler) {
        this.on(event, handler, true);
    }

    off(event, handler) {
        if (event != null) {
            if (handler != null) {
                if (this.list[event] && this.list[event].filter(eventObject => eventObject.handler === handler).length) {
                    let toRemove = this.list[event].filter(eventObject => eventObject.handler === handler)[0];
                    let index = this.list[event].indexOf(toRemove);
                    if (index > -1) {
                        this.list[event].splice(index, 1);
                    }
                } else {
                    console.warn(`Event ${event} cannot be unsubscribed - does not exist.`);
                }
            } else {
                this.list[event] = [];
            }
        } else {
            this.list = {};
        }
    }

}

export default new EventBus();
