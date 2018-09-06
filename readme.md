# Gia
Minimalistic JavaScript framework for server rendered websites.
**2.68 Kb** minified gzipped with all it’s parts loaded with a `script` tag.
Gia is modular in it’s nature. Following is the table of module sizes.

| **4.88 Kb** | Component (with code splitting support) |
| ----------- | --------------------------------------- |
| **1.80 Kb** | **BaseComponent**                       |
| **1.62 Kb** | eventbus                                |
| **1.39 Kb** | **loadComponents**                      |
| **1.26 Kb** | removeComponents                        |
| **0.88 Kb** | destroyInstance                         |
| **0.79 Kb** | createInstance                          |
| **0.69 Kb** | config                                  |
| **0.56 Kb** | getComponentFromElement                 |


Following sizes are for modules included separately (bundled separately). Modules often include common code, so when included and bundled together, final sizes are smaller and don't just add up.

[Installation](#installation)

[Usage](#usage)

[Component](#component)
* [Variables](#variables)
* [Methods](#methods)

[Helpers](#helpers)
* [loadComponents](#loadcomponents)
* [removeComponents](#removecomponents)
* [createInstances](#createinstances)
* [destroyInstances](#destroyinstances)
* [getComponentFromElement](#getcomponentfromelement)
* [config](#config)
* [eventbus](#eventbus)



## Installation
Include Gia with scripts tag

```html
<script src="./dist/gia.min.js"></script>
<!-- exposes all modules under global gia object -->

<!-- also possible to include only parts -->
<script src="./dist/BaseComponent.min.js"></script>
<script src="./dist/loadComponents.min.js"></script>
```
or with *npm* and *import*
```shell
npm install gia --save
```
```javascript
// import needed modules from npm
import Component from 'gia/Component';
import loadComponents from 'gia/loadComponents';
```



## Usage
First, a component needs to be created.
```javascript
class SampleComponent extends Component {
    mount() {
        console.log("Hello world!");
    }
}
```
Define the element where the component needs to be attached:
```html
<div g-component="SampleComponent">
    ...
</div>
```
And let the magic begin.
```javascript
const components = {
    "SampleComponent": SampleComponent
}

loadComponents(components);
```
This simple setup will give you component with a simple lifecycle, scoped to the DOM element, plus some other super powers!



## Component

Component is the building stone of Gia architecture. Gia only works with your HTML through components. To create new component, extend Gia default Component, or modified Gia component. If you’re really trying to go for minimal size and code splitting is not going to be needed, it is also possible to use BaseComponent, which does not include polyfills needed for code splitting.
```javascript
import Component from 'gia/Component';

class SampleComponent extends Component {
  mount() {
    console.log("Hello world!");
  }
}
```

### Variables

There are several variables available in component by default.

#### element
Variable holding the root element of the component.
```javascript
this.element; // DOM element
```

#### ref
Variable holding object with all the elements marked with `g-ref` attribute within the root element, where the contents of the attribute is used as *ref* name. By setting the `ref` variable, component gets a signal to look for the elements available within the root element of component. So this..
```html
<div g-component="SampleComponent">
    <div g-ref="singleRef">
    <div g-ref="multipleRefs">
    <div g-ref="multipleRefs">
</div>
```
```javascript
constructor(element) {
    super(element);
    this.ref = {
        singleRef: null, // looks for single element
        multipleRefs: [], // looks for multiple element
    }
}
```
…will end up in following value of the `ref` variable.
```javascript
console.log(this.ref);
// { "multipleRefs": [DOM element, DOM element], "singleRef": DOM element }
```
In case an empty object is set, component will look for any elements available and assume for all to be multiple (store in array).
```javascript
constructor(element) {
    super(element);
    this.ref = {};
    console.log(this.ref);
    // { "multipleRefs": [DOM element, DOM element], singleRef: [ DOM element ] }
}
```
In case some components are overlapping, but you would still like to use a same names for the ref elements, it is also possible to define the component for which the element is intended for inside of `g-ref` attribute.
```html
<div g-component="SampleComponent">
    <div g-component="AnotherComponent">
        <div g-ref="SampleComponent:refElement">
    </div>
</div>
```
The `refElement` will only be selected and stored by `SampleComponent`, and no others.

#### options
Variable holding options of the component. Default options can be set in constructor of the component. Options get automatically rewritten from the `g-options` attribute.

```html
<div g-component="SampleComponent" g-options='{"someOption": "customValue"}'>
```
```javascript
constructor(element) {
    super(element);
    this.options = {
        someOptions: "defaultValue"
    };
    console.log(this.options); // {someOption: "customValue"}
}
```

#### state
Variable holding state of the component. It is not necessary to use state at all, as components are not used to actually render HTML. However, in combination with **setState** and **stateChange** methods, state can be useful for certain components, like some sort of filter where simple state can be helpful. Another use case is component which often updates DOM, as by using **setState and stateChange** methods, modifications of DOM are made only when the state actually changed. State should only be changed by **setState** function and takes a form of object.
```javascript
console.log(this.state); // {}
```


### Methods

Component has a set of methods that can be used through it's lifecycle.

#### require
Method used for code splitting to require any libraries needed for the component to work.
This method is asynchronous and after it is resolved, the execution of **mount** method follows.
```javascript
async require() {
    this.throttle = await import('lodash/throttle');
}
```

#### mount
Method called after all assets are loaded - if any defined (after require method is resolved).
This is where you would add all your listeners and such...
```javascript
mount() {
    this.scrollHandler = this.handleScroll.bind(this);

    this.element.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('scroll', this.scrollHandler);
}
```

#### unmount
Method called before the component is destroyed (on `removeComponents` call).
This is where you would remove any global listeners.
Note that any listeners attached on or within the component root element are removed when the element is removed from DOM, as the component instance is stored within the element, so there is no need to remove those listeners, in case the element is removed from DOM.
```javascript
unmount() {
    this.element.removeEventListener('click', this.handleClick); // mostly not needed
    window.removeEventListener('scroll', this.scrollHandler);
}
```

#### setState
Method called to update state of the component. Only the changes of state are required to be passed in a form of object. Component will merge the changes with current state on it's own.
```javascript
this.setState({
    a: "a"
});
```
Note that it is recommended to only use simple state with one layer for the state to work correctly. State is here to allow some simple manipulation powered with state, not to store a complex state of whole application.
```javascript
this.setState({
    a: "a",
    b: ["a"],
    c: {a: "a"}
}); // all fine

this.setState({
    a: {
        b: {c: "c"}
    }
}); // not recommended
```

#### stateChange
This function gets called by **setState** method and any changes to state are passed as an argument. Ideally, any manipulation with DOM would be done within this function, as only the actual changes to state are passed on to here in a form of object.
```javascript
stateChange(stateChanges) {
   if('a' in stateChanges) {
        // "a" property of state was updated
   }
   console.log(stateChanges, this.state);
}
```
```javascript
this.setState({ a: "a", b: "b" }); // { a: "a", b: "b" }    { a: "a", b: "b" }
this.setState({ a: "a", b: "c" }); // { b: "c" }    { a: "a", b: "c" }
this.setState({ b: "d" }); // { b: "d" }    { a: "a", b: "d" }
```



## Helpers
### loadComponents
Initialises components within defined scope. In case an instance of the component already exists on the element, function skips initialisation. That means **loadComponents** can be always called without a context, but context should be defined for best performance.
```javascript
import loadComponents from 'gia/loadComponents';

const components = {
    "SampleComponent": SampleComponent,
}

loadComponents(components [, context]); // context is optional and defaults to document.documentElement
```

### removeComponents
Calls destroy method on every component within the context and removes component instance from the element.
```javascript
import removeComponents from 'gia/removeComponents';

removeComponents([context]); // context is optional and defaults to document.documentElement
```

### createInstances
Creates and returns instance of component. This function is used by **loadComponents**, but can be helpful in case of manually creating component instances. Classic use case would be using a set of components with one parent component controlling the others.
```javascript
import createInstance from 'gia/createInstance';

let instance = createInstance(element, componentName, component[, options]);
// options are optional and are passed into component contructor as second argument

instance._load(); // this is necessary
```
Note that calling `instance._load()` is required to start the lifecycle of the component.

### destroyInstances
Calls **unmount** method of component and removes instance of component form the element. This function is used by **removeComponents**.
```javascript
import destroyInstance from 'gia/destroyInstance';

destroyInstance(element);
```

### getComponentFromElement
Returns instance of component from element.
```javascript
import getComponentFromElement from 'gia/getComponentFromElement';

let element = document.getElementById('element');
let componentInstance = getComponentFromElement(element);
```

### config

Config is used as a store for options used in Gia and also as an interface to change default options. Currently, only the `log` option is available.
```javascript
import config from 'gia/config';

config.set('log', false); // disables unnecessary console.log calls
```

### eventbus

Eventbus can be used to communicate between components in a clear way. While it is possible to get an instance of another component and modify it directly, eventbus provides a simple interface that makes the interaction clearly visible from within the component.
```javascript
import eventbus from 'gia/eventbus';
import Component from 'gia/Component';

class Component1 extends Component {
    mount() {
        eventbus.on('writeConsole', this.handleEventBusCall);
    }

    handleEventBusCall() {
        console.log("Component2 triggered this through evenbus.");
    }
}

class Component2 extends Component {
    mount() {
        eventbus.emit("writeConsole");
    }
}

const components = {
    "Component1": Component1,
    "Component2": Component2
}

loadComponents(components); // will console.log "Component2 triggered this through evenbus."
```

#### on
Registers handler of event.
```javascript
eventbus.on('eventName', handler);
```

#### once
Registers handler of event, but handler is only called once and then removed.
```javascript
eventbus.once('eventName', handler);
```

#### emit
Calls any handlers previously registered with the same event name. Optional event object can be used as a argument, which gets passed into a handlers as an argument.
```javascript
eventbus.emit('eventName'[, eventObject]);
```

#### off
Unregisters handler of event. In case no handler is defined, eventbus removes all handlers for that event. In case not even event name is defined, eventbus removes all handlers for all events.
```javascript
eventbus.off('eventName', handler);
```
