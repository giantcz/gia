import { queryAll } from "./utils";
import destroyInstance from "./destroyInstance";

/**
 * Removes instances of components on elements within the context
 * @param context: DOM element
 */

export default function removeComponents(context = document.documentElement) {
    queryAll('[g-component]', context).forEach(element => {
        destroyInstance(element);
    });
}