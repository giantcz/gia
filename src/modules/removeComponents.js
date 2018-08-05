import { queryAll } from "./utils";

/**
 * Removes instances of components on element within the context
 * @param context: DOM element
 */

export default function removeComponents(context = document.documentElement) {
    queryAll('[data-component]', context).forEach(element => {
        this.destroyInstance(element);
    });
}