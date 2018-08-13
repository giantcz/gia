/**
 * destroys and removes instance from DOM element
 * @param element: DOM element
 */

export default function destroyInstance(element){
    const instance = getComponentFromElement(element);
    if (instance) {
        const name = instance._name;
        instance.destroy();
        element['__base_component__'] = null;
        console.info(`Removed component "${name}".`);
    }
}