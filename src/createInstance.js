/**
 * Creates and returns instance of component
 * @param element: DOM element
 * @param componentName: Component constructor
 */

export default function createInstance(element, componentName, components) {
    components[componentName].prototype._name = componentName;
    const component = new components[componentName](element);

    console.info(`Created instance of component "${componentName}".`);
    return component;
}