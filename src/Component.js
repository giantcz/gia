import 'babel-regenerator-runtime';
import BaseComponent from './BaseComponent';

/**
 * Component with code splitting support
 */

export default class Component extends BaseComponent {

    async require() {}

    _load() {
        this.require().then(::this.mount)
    }

}
