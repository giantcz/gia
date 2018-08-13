
/**
 * Component with code splitting support
 */

class Store {

    list = {};

    dispatch(event) {
        if (this.list[event]) {
            this.list[event].forEach(handler => handler());
            console.info(`${this.list[event].length} handler${this.list[event].length > 1 ? "s" : ""} called on event '${event}'`);
        } else {
            console.info(`0 handlers called on event '${event}'`);
        }
    }

    subscribe(event, handler) {
        if (this.list[event]) {
            this.list[event].push(handler);
        } else {
            this.list[event] = [];
            this.list[event].push(handler);
        }
    }

    unsubscribe(event, handler) {
        if (this.list[event] && this.list[event].indexOf(handler) != -1) {
            let index = this.list[event].indexOf(handler);
            if (index > -1) {
                this.list[event].splice(index, 1);
            }
        } else {
            console.warn(`Event ${event} cannot be unsubscribed - does not exist.`);
        }
    }

}

export default new Store();
