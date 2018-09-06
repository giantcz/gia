import loadComponents from '../src/loadComponents';
import createInstance from '../src/loadComponents';
import removeComponents from '../src/removeComponents';
import destroyInstance from '../src/removeComponents';
import getComponentFromElement from '../src/getComponentFromElement';
import BaseComponent from '../src/BaseComponent';
import eventbus from '../src/eventbus';
import config from '../src/config';

module.exports = {
    loadComponents: loadComponents,
    createInstance: createInstance,
    removeComponents: removeComponents,
    destroyInstance: destroyInstance,
    Component: BaseComponent,
    getComponentFromElement: getComponentFromElement,
    eventbus: eventbus,
    config: config,
}
