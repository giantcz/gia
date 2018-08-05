/**
 * Accepts object of component and saves them for use in loadComponents function
 * @param components: Object
 */
export default function addComponents(components) {
    Object.keys(components).forEach(key => {
        this.components[key] = components[key];
    });
}