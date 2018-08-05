# Base
Minimalistic JS framework for server rendered websites.

**2.7Kb** minified gzipped without code splitting support

**5.5Kb** minified gzipped with code splitting support


## Installation
Include Base with scripts tag
```html
<script src="./dist/base.min.js"></script>
```

or with import

```bash
npm install base --save
```
```javascript
// import the library from npm
import Base from 'base';
import Component from 'base/Component'; // also possible to import form 'base/BaseComponent' without code splitting support
```


## Usage
```javascript
// create instance
const base = new Base();
```

after instance is create, a set of components needs to be passed into Base so it can be used across a page

```javascript
class SampleComponent extends Component {
    prepare() {
        console.log("Hello world!");
    }
}

base.addComponents({
    "SampleComponent": SampleComponent
});
```

and finally, let Base attach the components...

 ```html
<div data-component="SampleComponent">
    ...
</div>
 ```
 ```javascript
base.loadComponents();
 ```

## Components
Component is the building stone of Base architecture.
Base only works with your HTML through components.

### Methods

To create new component, extend Base default Component:
```javascript
class SampleComponent extends Component {
    prepare() {
        console.log("Hello world!");
    }
}
```

Component has a set of methods that can be used through it's lifecycle.

#### componentDidMount
Method called right after the instance of component is created.
Children/parent variables are already defined at this point and can be used within the function

```javascript
componentDidMount() {
    this.children; // gets object of children components
}
```

#### require
Method used for code splitting to require any libraries needed for the component to work.
This method is asynchronous.

```javascript
async require() {
    this.throttle = await import('lodash/throttle');
}
```

#### prepare
Method called after all assets are loaded (after require method is resolved).
This is where you would add all your listeners and such...

```javascript
prepare() {
    this.element.addEventListener('click', this.handleClick);
}

#### prepare
Method called after all assets are loaded (after require method is resolved).
This is where you would add all your listeners and such...

```javascript
prepare() {
    this.element.addEventListener('click', this.handleClick);
    window.addEventListener('scroll', this.handleClick);
}