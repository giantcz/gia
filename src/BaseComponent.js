import { query, queryAll } from './utils';

/**
 * Component without code splitting support
 */

export default class Component {

    constructor(element, options) {
        this.element = element;
        this.element['__goop_component__'] = this;
        this._ref = {};
        this._options = options || {};
        this._state = {};
    }

    get ref() {
        return this._ref;
    }

    set ref(items) {
        this._ref = this._getRefElements(items);
        return this._ref;
    }

    get options() {
        return this._options;
    }

    set options(defaults) {
        let options = {};
        let optionsFromAttribute = this.element.getAttribute('g-options');
        if(optionsFromAttribute) {
            options = JSON.parse(optionsFromAttribute);
        }

        this._options = {
            ...this._options,
            ...defaults,
            ...options,
        }
    }

    get state() {
        return this._state;
    }

    set state(state) {
        console.warn('You should not change state manually. Use setState instead.');
        this._state = state;
    }

    _load() {
        this.mount();
        this.prepare();
    }

    mount() {
        // this is here only to be rewritten by extend
    }

    prepare() {
        console.warn(`Component ${this._name} does not have "prepare" method.`);
    }

    destroy() {
        // this is here only to be rewritten by extend
    }

    getRef(ref, prefixed = false) {
        return `[g-ref="${prefixed ? `${this._name}:` : ''}${ref}"]`;
    }

    _getRefElements(items = null) {
        if (Object.keys(items).length == 0) {
            let elements = queryAll('[g-ref]', this.element);
            elements.forEach(element => {
                let refName = element.getAttribute('g-ref');
                if (!this._ref[refName]) {
                    this._ref[refName] = elements.filter(item => {
                        return item.getAttribute('g-ref') === refName;
                    });
                }
            });
        } else {
            Object.keys(items)
                .forEach(key => {
                    if (Array.isArray(items[key])) {
                        let elements = queryAll(this.getRef(key, true), this.element);
                        if (!elements.length) {
                            elements = queryAll(this.getRef(key), this.element);
                        }
                        this._ref[key] = elements;
                    } else if (!items[key]) {
                        let element = query(this.getRef(key, true), this.element);
                        if (!element) {
                            element = query(this.getRef(key), this.element);
                        }
                        this._ref[key] = element;
                    } else {
                        this._ref[key] = items[key];
                    }
                });
        }

        return this._ref;
    }

    setState(newState) {

        let stateChanges = {};

        Object.keys(newState).forEach(key => {
            if(typeof newState[key] === 'boolean' || typeof newState[key] === 'string' || typeof newState[key] === 'number' || typeof newState[key] === 'undefined') {
                if(this._state[key] !== newState[key]) {
                    stateChanges[key] = newState[key];
                }
            } else if (newState[key].constructor === Array) {
                if(this._state[key] != null) {
                    stateChanges[key] = [];
                    newState[key].forEach((item, index) => {
                        //console.log(this.state[key] != null, this.state[key], newState[key])
                        if(this._state[key][index] !== newState[key][index]) {
                            stateChanges[key][index] = newState[key][index];
                        }
                    });
                } else {
                    stateChanges[key] = newState[key];
                }
            } else if (typeof newState[key] === 'object') {
                stateChanges[key] = {};
                Object.keys(newState[key]).forEach(subkey => {
                    stateChanges[key][subkey] = newState[key][subkey];
                });
            }
        });

        // Object.keys(stateChanges).forEach(key => {
        //     if (newState[key].constructor === Array && stateChanges[key].length === 0) {
        //         delete stateChanges[key];
        //     } else if (typeof newState[key] === 'object' && Object.keys(stateChanges[key]).length === 0) {
        //         delete stateChanges[key];
        //     }
        // });

        this._state = newState;
        this.stateChange(stateChanges);
    }

    stateChange(stateChanges) {
        // this is here only to be rewritten by extend
    }

}
