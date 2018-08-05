import addComponents from './src/modules/addComponents';
import createInstance from './src/modules/createInstance';
import destroyInstance from './src/modules/destroyInstance';
import loadComponents from './src/modules/loadComponents';
import removeComponents from './src/modules/removeComponents';
import getComponentFromElement from './src/modules/getComponentFromElement';
import BaseComponent from './src/modules/BaseComponent';

class Base {
    constructor(options) {
        this.addComponents = addComponents;
        this.createInstance = createInstance;
        this.destroyInstance = destroyInstance;
        this.loadComponents = loadComponents;
        this.removeComponents = removeComponents;
        this.Component = BaseComponent;
        this.getComponentFromElement = getComponentFromElement;

        this.components = {};
    }
}

module.exports = Base;
