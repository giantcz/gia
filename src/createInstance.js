import config from './config';

/**
 * Creates and returns instance of component
 * @param element: DOM element
 * @param componentName: Component name
 * @param component: Component constructor
 * @param options: options object passed into a component
 */

export default function createInstance(element, componentName, component, options) {
    component.prototype._name = componentName;
    const instance = new component(element, options);

    if (config.get('log')) {
        console.info(`Created instance of component "${componentName}".`);
    }
    return instance;
}