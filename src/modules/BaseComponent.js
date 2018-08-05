import { query, queryAll } from './utils';
import getComponentFromElement from './getComponentFromElement';

/**
 * Component without code splitting support
 */

export default class Component {

    constructor(element) {
        this.element = element;
        this.element['__base_component__'] = this;
        this._ref = {};
        this.ref = {};
        this._options = {};
        this.options = {};
        this.options = {};
        this._state = {};
        this.props = {};
        this.children = {};
    }

    get ref() {
        return this._ref;
    }

    set ref(items) {
        if (Object.keys(items).length == 0) {
            this._ref = this._getRefElements();
        } else {
            this._ref = {};
            this._ref = this._getRefElements(items);
        }

        return this._ref;
    }

    get options() {
        return this._options;
    }

    set options(defaults) {
        let options = {};
        if(this.element.dataset.options) {
            options = JSON.parse(this.element.dataset.options);
        }

        this._options = {
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
        this.getChildren();
        this.componentDidMount();
        this.prepare();
    }

    componentDidMount() {}

    prepare() {
        console.warn(`Component ${this._name} does not have "prepare" method.`);
    }

    destroy() {
        // this is here only to be rewritten by extend
    }

    getRef(ref, prefixed = false) {
        return `[data-ref="${prefixed ? `${this._name}:` : ''}${ref}"]`;
    }

    _getRefElements(items = null) {
        if (items == null) {
            items = {};

            queryAll('[data-ref]', this.element).forEach(item => {
                let name = item.dataset.ref;
                let multiple = false;

                if (items[name] != null) {
                    return true;
                }

                if (name.includes('[]')) {
                   multiple = true;
                   name = name.replace('[]', '');
                }

                if (name.split(':').length > 1) {
                    if (name.split(':')[0] == this._name) {
                        if (multiple) {
                            items[ name.split(':')[1] ] = [];
                        } else {
                            items[ name.split(':')[1] ] = null;
                        }
                    }
                } else {
                    if (multiple) {
                        items[ name ] = [];
                    } else {
                        items[ name ] = null;
                    }
                }
            });
        }

        Object.keys(items)
            .forEach(key => {
                if (Array.isArray(items[key])) {
                    let elements = queryAll(this.getRef(key + '[]', true), this.element);
                    if (elements.length === 0) {
                        elements = queryAll(this.getRef(key.slice(0, -1), true), this.element);
                        if (elements.length === 0) {
                            elements = queryAll(this.getRef(key + '[]'), this.element)
                            if (elements.length === 0) {
                                elements = queryAll(this.getRef(key.slice(0, -1)), this.element)
                            }
                        }
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

        Object.keys(stateChanges).forEach(key => {
            if (newState[key].constructor === Array && stateChanges[key].length == 0) {
                delete stateChanges[key];
            } else if (typeof newState[key] === 'object' && Object.keys(stateChanges[key]).length == 0) {
                delete stateChanges[key];
            }
        });

        this.stateChange(stateChanges);
        this._state = newState;
    }

    stateChange(stateChanges) {}

    setProp(name, prop) {
        if(this.prop[name] != null) {
            console.warn(`You are rewriting previously defined prop (${name}).`);
        }
        this.props[name] = prop;
    }

    getChildren() {
        // children
        this.children = {};
        queryAll('[data-component]', this.element).forEach(element => {
            if(element.dataset.componentName != null) {
                if(this.children[element.dataset.componentName] == null) {
                    this.children[element.dataset.componentName] = getComponentFromElement(element);
                    getComponentFromElement(element).parent = this;
                } else {
                    console.warn(`Two children with same name ${element.dataset.componentName}`);
                }
            } else {
                if(this.children[element.dataset.component] == null) {
                    this.children[element.dataset.component] = getComponentFromElement(element);
                    getComponentFromElement(element).parent = this;
                } else {
                    console.warn(`Two children with same name ${element.dataset.component}`);
                }
            }
        });
    }

}
