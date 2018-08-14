
/**
 * Component with code splitting support
 */

class Store {

    list = {};

    emit(event) {
        if (this.list[event]) {
            this.list[event].forEach(handler => handler());
            console.info(`${this.list[event].length} handler${this.list[event].length > 1 ? "s" : ""} called on event '${event}'`);
        } else {
            console.info(`0 handlers called on event '${event}'`);
        }
    }

    on(event, handler) {
        if (this.list[event]) {
            this.list[event].push(handler);
        } else {
            this.list[event] = [];
            this.list[event].push(handler);
        }
    }

    off(event, handler) {
        if (event != null) {
            if (handler != null) {
                if (this.list[event] && this.list[event].indexOf(handler) !== -1) {
                    let index = this.list[event].indexOf(handler);
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

export default new Store();
