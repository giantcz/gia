export function query(selector, context = document) {
    if (typeof selector !== 'string') {
        return selector;
    }

    return context.querySelector(selector);
}

export function queryAll(selector, context = document) {
    if (typeof selector !== 'string') {
        return selector;
    }

    return Array.prototype.slice.call(context.querySelectorAll(selector));
}

export function toggleClass(element, className, condition = null) {
    if (condition === null) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    } else {
        if (condition) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    }
}

export function removeClass(nodes, className) {
    if (Array.isArray(nodes)) {
        nodes.forEach(node => node.classList.remove(className));
    } else {
        nodes.classList.remove(className);
    }

    return nodes;
}

export function addClass(nodes, className) {
    if (Array.isArray(nodes)) {
        nodes.forEach(node => node.classList.add(className));
    } else {
        nodes.classList.add(className);
    }

    return nodes;
}

export function triggerEvent(
    element,
    eventType,
    params = null,
    options = {
        bubbles: true,
        cancelable: true,
        detail: null
    }) {
    options.detail = params;
    const event = new CustomEvent(eventType, options);
    element.dispatchEvent(event);
}
