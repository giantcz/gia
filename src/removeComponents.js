import { queryAll } from "./utils";
import getComponentFromElement from "./getComponentFromElement";

/**
 * Removes instances of components on element within the context
 * @param context: DOM element
 */

export default function removeComponents(context = document.documentElement) {
    queryAll('[g:component]', context).forEach(element => {
        destroyInstance(element);
    });
}

/**
 * destroys and removes instance from DOM element
 * @param element: DOM element
 */

export function destroyInstance(element){
    const instance = getComponentFromElement(element);
    if (instance) {
        const name = instance._name;
        instance.destroy();
        element['__base_component__'] = null;
        console.info(`Removed component "${name}".`);
    }
}