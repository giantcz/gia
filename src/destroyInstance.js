import getComponentFromElement from './getComponentFromElement';
import config from './config';

/**
 * Destroys and removes instance from DOM element
 * @param element: DOM element
 */

export default function destroyInstance(element){
    const instance = getComponentFromElement(element);
    if (instance) {
        const name = instance._name;
        instance.unmount();
        element['__gia_component__'] = null;
        if (config.get('log')) {
            console.info(`Removed component "${name}".`);
        }
    }
}