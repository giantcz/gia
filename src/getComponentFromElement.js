/**
 * Return instance from element
 * @param element: DOM element
 * @returns component instance
 */

export default function getComponentFromElement(element) {
    if (typeof element === 'string') {
        element = document.getElementById(element);

        if (!element) {
            return null;
        }
    }

    return element['__goop_component__'];
}