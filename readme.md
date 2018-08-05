# Base
Minimalistic JS framework for server rendered websites.
**2.44 Kb** minified gzipped included with script tag.
Base is modular, by default you will need two modules **BaseComponent** and **loadComponents** (minimal setup **3.22 Kb**)**.**

| Size        | Module                                  |
| ----------- | --------------------------------------- |
| **5.16 Kb** | Component (with code splitting support) |
| **2.09 Kb** | **BaseComponent**                       |
| **1.13 Kb** | **loadComponents**                      |
| **0.98 Kb** | removeComponents                        |
| **0.52 Kb** | getComponentFromElement                 |



# Installation

Include Base with scripts tag

```html
<script src="./dist/base.min.js"></script>
<!-- also possible to include only parts (recommended only for HTTP2 users) -->
<script src="./dist/BaseComponent.min.js"></script>
<script src="./dist/loadComponents.min.js"></script>
```

or with import *npm*

```bash
npm install base --save
```
```javascript
// import needed modules from npm
import Component from 'base/Component';
import loadComponents from 'base/loadComponents';
```

# Usage

First, a component needs to be created.

```javascript
class SampleComponent extends Component {
  prepare() {
    console.log("Hello world!");
  }
}
```

Define the element where the component need to be attached:

```html
<div data-component="SampleComponent">
  ...
</div>
```

And make the the magic begin.

```javascript
const components = {
  "SampleComponent": SampleComponent
}

loadComponents(components);
```

This simple setup will give you scoped components with super powers!


# Components

Component is the building stone of Base architecture. Base only works with your HTML through components. To create new component, extend Base default Component. If you’re really trying to go for minimal size, it is also possible to use BaseComponent, which does not include polyfills needed for code splitting.

```javascript
import Component from 'base/Component';

class SampleComponent extends Component {
  prepare() {
    console.log("Hello world!");
  }
}
```

## Variables

There are several variables available in component by default.

### element
Variable holding the root element of the component.

```javascript
this.element; // DOM element
```

### ref
Variable holding object with all the elements marked with `data-ref` attribute within the root element, where the contents of the attribute is used as *ref* name.

```javascript
this.ref; // { "refName": DOM element }
```

in case there are more elements that play the same role in component, the elements can be marked with the same attribute with `[]` at the end of the name. In that case, component creates an array with DOM element references, even if there is only one element (convenient when the number of elements is dynamic).

```html
<div data-component="SampleComponent">
  <div data-ref="items[]">
  <div data-ref="items[]">
</div>
```
```javascript
this.ref; // { "items": [DOM element, DOM element] }
```

In case you are building reusable component and would like to set the structure of the ref elements within the component, you can do so by setting the ref variable in constructor of the component.

```javascript
this.ref = {
  singleRef: null,
  multipleRefs: [],
}
```

Component will search for those `data-ref` elements and you can have a structure clearly visible within the component.

### options
Variable holding options of the component. Default options can be set in constructor of the component. Options get automatically rewritten from the `data-options` attribute.

```html
<div data-component="SampleComponent" data-options='{"someOption": "customValue"}'>
```
```javascript
constructor() {
  this.options = {
    someOptions: "defaultValue"
  };
  this.options; // {someOption: "customValue"}
}
```

### state
Variable holding state of the component. It is not necessary to use state at all, as components are not used to actually render HTML. However, in combination with **setState** and **stateChange** methods, state can be useful for components with complex states, like some sort of filter. Another use case is component which often updates DOM, because by using **setState** modifications of DOM are made only when the state actually changed.

### props
Variable holding object with props set for the component by it's parent component. Can be used for passing globally used values or passing handlers from parent component.

```javascript
prepare() {
  this.props; // {someProp: "anything"}
}
```

### children
Variable holding object with children components (any element with `data-component` attribute within the root element of the component). Can be used for passing props or manipulating with children components, like calling children methods.

```javascript
// in parent component
componentDidMount() {
  this.children.ChildName.setProp('clickHandler', this.clickHandler.bind(this));
}
```
```javascript
// in child component
prepare() {
  this.element.addEventListener('click', this.props.clickHandler);
}
```

## Methods

Component has a set of methods that can be used through it's lifecycle.

### componentDidMount
Method called right after the instance of component is created.
Children/parent variables are already defined at this point and can be used within the function

```javascript
componentDidMount() {
  this.children; // gets object with children components
}
```

### require
Method used for code splitting to require any libraries needed for the component to work.
This method is asynchronous.

```javascript
async require() {
  this.throttle = await import('lodash/throttle');
}
```

### prepare
Method called after all assets are loaded (after require method is resolved).
This is where you would add all your listeners and such...

```javascript
prepare() {
  this.element.addEventListener('click', this.handleClick);
  window.addEventListener('scroll', this.handleScroll);
}
```

### destroy
Method called before the component is destroyed (on `removeComponents` call).
This is where you would remove any global listeners...
Note that any listeners attached on or within the component element are remove when the element is removed from DOM, as the component instance is stored within the element, so there is no need to remove those listeners.

```javascript
destroy() {
  this.element.removeEventListener('click', this.handleClick); // not needed
  window.removeEventListener('scroll', this.handleScroll);
}
```

### setState
Method called to update state of the component.

```javascript
...
this.setState({
  ...this.state,
  a: "a"
});
...
```

### stateChange
Ideally, any manipulation with DOM would be done within this function. `stateChanges` is a state object with only properties that were updated with `setState` call and actually changed.

```javascript
stateChange(stateChanges) {
   if('a' in stateChanges) {
        // a property of state was updated
    }
}
```

### setProp
Used from parent component to set props on children components.

```javascript
// in parent component
componentDidMount() {
  this.children.ChildName.setProp('clickHandler', this.clickHandler.bind(this));
}
```
```javascript
// in child component
prepare() {
  this.element.addEventListener('click', this.props.clickHandler);
}
```


# Helpers

## loadComponents

Initialises components within defined scope. In case an instance of the component already exists on the element, function skips initialisation.

```javascript
import loadComponents from 'base/loadComponents';

const components = {
  "SampleComponent": SampleComponent,
}

loadComponents(components [, context]); // context is optional and defaults to document.documentElement
```

## removeComponents

Calls destroy method on every component within the context and remove component instance.

```javascript
import removeComponents from 'base/removeComponents';

removeComponents(context); // context is optional and defaults to document.documentElement
```

## getComponentFromElement

Returns instance of component initialised on element.

```javascript
import getComponentFromElement from 'base/getComponentFromElement';

let element = document.getElementById('element');
let component = getComponentFromElement(element);
```
