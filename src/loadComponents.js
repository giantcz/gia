import { queryAll } from "./utils";
import getComponentFromElement from './getComponentFromElement';

/**
 * Creates instances of components without creating duplicates on element within the context
 * @param components: object of components to load
 * @param context: DOM element
 */

export default function loadComponents(components = {}, context = document.documentElement) {

    if (!components || Object.keys(components).length === 0) {
        console.warn('App has no components');
        return;
    }

    let initialisedComponents = [];

    queryAll('[data-component]', context).forEach((element) => {
        const instance = getComponentFromElement(element);

        if (instance) {
            console.warn('Error: instance exists: \n', instance);
            return true; // continue
        }

        let componentName = element.dataset.component;

        if (typeof components[componentName] === 'function') {
            initialisedComponents.push(createInstance(element, componentName, components));
        } else {
            console.warn(`Constructor for component "${componentName}" not found.`);
        }
    });

    // call load/require/prepare
    initialisedComponents.forEach(component => {
        component._load();
    });
}


/**
 * Creates and returns instance of component
 * @param element: DOM element
 * @param componentName: Component constructor
 */

export function createInstance(element, componentName, components) {
    components[componentName].prototype._name = componentName;
    const component = new components[componentName](element);

    console.info(`Created instance of component "${componentName}".`);
    return component;
}
