
/**
 * Config for setting and changing global settings
 */

class Config {
    _options = {
        log: true,
    }

    set(name, value) {
        this._options[name] = value;
    }

    get(name) {
        return this._options[name];
    }
}

export default new Config;
