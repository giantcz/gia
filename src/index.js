import addComponents from './modules/addComponents';
import createInstance from './modules/createInstance';
import destroyInstance from './modules/destroyInstance';
import loadComponents from './modules/loadComponents';
import removeComponents from './modules/removeComponents';

class Base {
    constructor(options) {
        this.addComponents = addComponents;
        this.createInstance = createInstance;
        this.destroyInstance = destroyInstance;
        this.loadComponents = loadComponents;
        this.removeComponents = removeComponents;

        this.components = {};
    }
}

export default Base;
