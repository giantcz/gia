import { queryAll } from "./utils";
import getComponentFromElement from './getComponentFromElement';


/**
 * Creates instances of components without creating duplicates on element within the context
 * @param context: DOM element
 */

export default function loadComponents(context = document.documentElement) {

    if (!this.components || Object.keys(this.components).length === 0) {
        console.warn('App has no components');
        return;
    }

    let components = [];

    queryAll('[data-component]', context).forEach((element) => {
        const instance = getComponentFromElement(element);

        if (instance) {
            console.warn('Error: instance exists: \n', instance);
            return true; // continue
        }

        let componentName = element.dataset.component;

        if (typeof this.components[componentName] === 'function') {
            components.push(this.createInstance(element, componentName));
        } else {
            console.warn(`Constructor for component "${componentName}" not found.`);
        }
    });

    // call load/require/prepare
    components.forEach(component => {
        component._load();
    });
}
