/**
 * Return instance from element
 * @param element: DOM element
 * @returns component instance
 */

export default function getComponentFromElement(element) {
    return element['__base_component__'];
}