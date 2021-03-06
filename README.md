# d3-view

[![CircleCI](https://circleci.com/gh/quantmind/d3-view.svg?style=svg&circle-token=f84972c3cf4e8f17d74066ead28544da990115c3)](https://circleci.com/gh/quantmind/d3-view)
[![Dependency Status](https://david-dm.org/quantmind/d3-view.svg)](https://david-dm.org/quantmind/d3-view)
[![devDependency Status](https://david-dm.org/quantmind/d3-view/dev-status.svg)](https://david-dm.org/quantmind/d3-view#info=devDependencies)

[Coverage][]

This is a [d3 plugin](https://bost.ocks.org/mike/d3-plugin/) for building
interactive web interfaces.
It provides data-reactive components with a simple and flexible API.

* Modern javascript
* Minimal footprint  - use only what you need
* Built on top of [d3](https://github.com/d3)


## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installing](#installing)
- [Getting Started](#getting-started)
  - [Create a view-model object](#create-a-view-model-object)
- [View](#view)
  - [View API](#view-api)
    - [view.model](#viewmodel)
    - [view.parent](#viewparent)
    - [view.el](#viewel)
    - [view.createElement(<i>tag</i>)](#viewcreateelementitagi)
    - [view.mount(<i>element</i>)](#viewmountielementi)
    - [view.use(<i>plugin</i>)](#viewuseiplugini)
- [Model](#model)
  - [Model API](#model-api)
    - [model.parent](#modelparent)
    - [model.$get(attribute)](#modelgetattribute)
    - [model.$set(attribute, value)](#modelsetattribute-value)
    - [model.$update(object)](#modelupdateobject)
    - [model.$on(attribute, callback)](#modelonattribute-callback)
    - [model.$off()](#modeloff)
    - [model.$child(intials)](#modelchildintials)
    - [model.$new(intials)](#modelnewintials)
- [Directives](#directives)
  - [Core Directives](#core-directives)
    - [d3-attr](#d3-attr)
    - [d3-for](#d3-for)
    - [d3-html](#d3-html)
    - [d3-if](#d3-if)
    - [d3-model](#d3-model)
    - [d3-on](#d3-on)
    - [d3-show](#d3-show)
    - [d3-value](#d3-value)
  - [Custom Directive](#custom-directive)
  - [Directive API](#directive-api)
    - [directive.el](#directiveel)
    - [directive.expression](#directiveexpression)
    - [directive.create(<i>expression</i>)](#directivecreateiexpressioni)
    - [directive.mount(<i>model</i>)](#directivemountimodeli)
    - [directive.refresh(<i>model, newValue</i>)](#directiverefreshimodel-newvaluei)
    - [directive.destroy(<i>model</i>)](#directivedestroyimodeli)
- [Components](#components)
  - [Registration](#registration)
  - [Components API](#components-api)
  - [Creating a component](#creating-a-component)
    - [component.model](#componentmodel)
    - [component.init(<i>options</i>)](#componentinitioptionsi)
    - [component.render(<i>data, attrs</i>)](#componentrenderidata-attrsi)
    - [component.mounted()](#componentmounted)
    - [component.destroy()](#componentdestroy)
  - [Component API](#component-api)
    - [component.events](#componentevents)
    - [component.parent](#componentparent)
    - [component.root](#componentroot)
    - [component.uid](#componentuid)
- [Expressions](#expressions)
  - [Expressions API](#expressions-api)
    - [expression.expr](#expressionexpr)
    - [expression.eval(model)](#expressionevalmodel)
    - [expression.safeEval(model)](#expressionsafeevalmodel)
    - [expression.identifiers()](#expressionidentifiers)
- [Plugins](#plugins)
  - [Form Plugin](#form-plugin)
    - [Importing](#importing)
    - [Form API](#form-api)
  - [Bootstrap Plugin](#bootstrap-plugin)
- [Providers](#providers)
- [Other Frameworks](#other-frameworks)
- [D3 plugins](#d3-plugins)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installing

If you use [NPM](https://www.npmjs.com/package/d3-view), ``npm install d3-view``.
Otherwise, download the [latest release](https://github.com/quantmind/d3-view/releases).
You can also load directly from [giottojs.org](https://giottojs.org),
as a [standalone library](https://giottojs.org/latest/d3-view.js) or
[unpkg](https://unpkg.com/d3-view/).
AMD, CommonJS, and vanilla environments are supported. In vanilla, a d3 global is exported.
Try [d3-view](https://runkit.com/npm/d3-view) in your browser.
```javascript
<script src="https://d3js.org/d3-array.v1.min.js"></script>
<script src="https://d3js.org/d3-collection.v1.min.js"></script>
<script src="https://d3js.org/d3-color.v1.min.js"></script>
<script src="https://d3js.org/d3-dispatch.v1.min.js"></script>
<script src="https://d3js.org/d3-ease.v1.min.js"></script>
<script src="https://d3js.org/d3-selection.v1.min.js"></script>
<script src="https://d3js.org/d3-timer.v1.min.js"></script>
<script src="https://d3js.org/d3-array.v1.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
<script src="https://d3js.org/d3-transition.v1.min.js"></script>
<script src="https://giottojs.org/latest/d3-let.min.js"></script>
<script src="https://giottojs.org/latest/d3-view.min.js"></script>
<script>

var vm = d3.view();
...
vm.mount("#my-element");

</script>
```

## Getting Started

``d3.view`` is a [d3 plugin](https://bost.ocks.org/mike/d3-plugin/) for building
data driven web interfaces. It is not a framework as such, but you can easily
build one on top of it.

Importantly, this library does not make any choice for you, it is build on top
of the modular d3 library following very similar design patterns.


### Create a view-model object

To create a view object for you application, invoke the ``d3.view`` function
```javascript
var vm = d3.view({
    model: {...},
    props: [...],
    components: {...},
    directives: {...}
});
```

You can create more than one view:
```javascript
var vm2 = d3.view({
    model: {},
    props: [...],
    components: {},
    directives: {}
});
```

All properties in the input object are optionals and are used to initialised the view with
custom data ([model][]), [components][] and [directives][].

## View

### View API

With the exception of the [mount](#view-mount) and 
[use](#view-use) methods, the view API is available once the view
has been mounted to an HTML element, i.e. once the [mount](#view-mount)
method has been called.

#### view.model

The [model](#model) bound to the view, the combo gives the name to the object, the **view-model object**.

#### view.parent

The parent of a view, always **undefined**, a view is always the root element of
a view mounted DOM.

#### view.el

Root HTMLElement of the view.

#### view.createElement(<i>tag</i>)

Create a new HTML Element with the given tag. Return a [d3.selection][]
of the new element.

#### view.mount(<i>element</i>)

Mount a view model into the HTML ``element``.
The view only affect ``element`` and its children.
This method can be called **once only** for a given view model.

#### view.use(<i>plugin</i>)

Install a [plugin](#plugins) into the view model. This method can be called several times with as many plugins as one needs,
however it can be called only before the view is mounted into an element.


## Model

At the core of the library we have the Hierarchical Reactive Model.
The Model is comparable to angular scope but its implementation is different.

* **Hierarchical**: a **root** model is associated with a d3-view object.

* **Reactive**:

A model can be associated with more than one element, new children model are created for elements that needs a new model.
For example, a [component][] that specify the ``model`` object during initialisation, creates its own model,
a child model of the model associated with its parent element.

### Model API

#### model.parent

Get the ancestor of the model if it exists. It it does not exist, this is the root model.

#### model.$get(attribute)

Get an attribute value from the model, traversing the tree. If the ``attribute`` is not available in the model,
it will recursively retrieve it from its [parent](#modelparent).

#### model.$set(attribute, value)

Set an attribute value in the model, traversing the tree. If the attribute is not
a reactive attribute it becomes one.

#### model.$update(object)

Same as [$set]() bit for a group of attribute-value pairs.

#### model.$on(attribute, callback)

Add a ``callback`` to a model reactive ``attribute``. The callback is invoked when
the attribute change value only. It is possible to pass the ``callback`` only, in which
case it is triggered when any of the model **own attributes** change.

#### model.$off()

Remove all callbacks from reactive attributes

#### model.$child(intials)

Crate a child model with prototypical inheritance from the model.
```javascript
var a = d3.viewModel({foo: 4});
var b = model.$child({bla: 3});
b.foo       //  4
b.bla       //  3
b.parent    //  a
```
#### model.$new(intials)

Create a child model, with no inheritance from the parent (an isolated model).
```javascript
var a = d3.viewModel({foo: 4});
var b = model.$new({bla: 3});
b.foo       //  undefined
b.bla       //  3
b.parent    //  a
```

## Directives

Directives are special attributes with the ``d3-`` prefix.
Directive attribute values are expected to be binding [expressions](#expressions).
The library provides several directives for every day task.

For example the ``d3-html`` directive binds an expression to the inner
Html of the element containing the directive:
```html
<div id="entry">
    ...
    <p d3-html='paragrah'></p>
    ...
</div>
```
Here the ``paragraph`` is a reactive attribute of the View model.
```javascript
d3.view({
    model: {
        paragraph: 'TODO'
    }
}).mount('#entry');
```

### Core Directives

#### d3-attr

The [d3-attr][] directive creates a **one-way binding** between a model
property and an HTML element attribute
```html
<input d3-attr-name="code" d3-attr-placeholder="description || code">
```
The ``attr`` can be omitted for ``class``, ``name`` , ``disabled``,
``readonly`` and ``required``.
```html
<input d3-name="code" d3-class="bright ? 'bright' : 'dull'">
```
``code`` and ``bright`` are reactive properties of the view-model.

#### d3-for

As the name suggest, the [d3-for][] directive can be used to repeat the
element once per item from a collection. Each element gets its own model,
where the given loop variable is set to the current collection item,
and ``index`` is set to the item index or key.


#### d3-html

The [d3-html][] directive creates a **one-way-binding** between a model property
and the innerHtml property of the hosting HTML element.
You can use it to attach html or text to element dynamically.

#### d3-if

With [d3-if][] you can create conditionals.

#### d3-model

The [d3-model][] directive is a special directive and the first to be mounted, if available,
into the hosting element. As the name suggests, the directive
creates a new model on the element based on data from parent models.


#### d3-on

The [d3-on][] directive attaches an event listener to the element. The event type is denoted by the argument.
The expression should be model method call, the event ``callback``. if the attribute is omitted
it is assumed to be a ``click`` event.
The event ``callback`` listens to **native DOM events only**.
```html
<button d3-on-click="submit()">Submit</button>
```

#### d3-show

The [d3-show][] directive display or hide an element. The display style is preserved.

#### d3-value

The [d3-value][] directive establish a **two-way data binding** for HTML
elements supporting the value property.
The binding is two ways because

* an update in the model attribute causes an update in the HTML value property
* an update in the HTML value property causes an update in the model attribute

### Custom Directive

Creating a custom directive involve the following steps:

* Create a (reusable) directive object:
```javascript
var mydir = {
    create (expression) {
        return expression;
    },
    mount (model) {
        return model;
    },
    refresh (model, value) {
    },
    destroy () {
    
    }
};
```
* Add the directive to the view constructor:
```javascript
var vm = d3.view({
    el: '#entry',
    directives: {
        mydir: mydir
    }
};
```
* Use the directive via the ``d3-mydir`` attribute.

A directive is customized via the four methods highlighted above.
None of the method needs implementing, and indeed for some directive
the ``refresh`` method is the only one which needs attention.

Directives can also be added via [plugins][]

### Directive API

#### directive.el

The HTML Element hosting the directive, available after initialisation and therefore accessible by all
API methods.

#### directive.expression

The parsed expression, available after the [create](#directivecreateexpression)
method has been called.

#### directive.create(<i>expression</i>)

The ``create`` method is called once only, at the end of directive initialisation, no binding with the HTML element or model has yet occurred.
The ``expression`` is the attribute value, a string, and it is not yet parsed.
This method must return the expression for parsing (it doesn't need to be the same as the input expression).
However, if it returns nothing, the directive is not executed.

#### directive.mount(<i>model</i>)

The ``mount`` method is called once only, at the beginning of the binding process with the HTML element.
The expression returned by the ``create`` method
has been parsed and available in the ``this.expression`` attribute.
This method must return the model for binding (it doesn't need to be the same as the input model, but usually it is).
However, if it returns nothing, the binding execution is aborted.

#### directive.refresh(<i>model, newValue</i>)

This method is called every time the model associated with the element hosting the directive, has changed value. It is also called at the end of a successful [mount](#directivemountmodel).

#### directive.destroy(<i>model</i>)

Called when the element hosting the directive is removed from the DOM.

## Components

Components help you extend basic HTML elements to encapsulate reusable code.
They are custom elements that ``d3.view`` attach specified behavior to.

### Registration

In order to use components you need to register them with the ``view`` object:
```javascript
d3.view({
    components: {
        tag1: component1,
        ...
        tagN: componentN
    }
});
```
A component is either an object:
```javascript
var component1 = {
    render: function () {
        return this.htmlElement('<p>Very simple component</p>');
    }
};
```
or a function, the component render method:
```javascript
function component1 () {
    return this.htmlElement('<p>Another very simple component</p>');
}
```

### Components API

<a name="user-content-component-el" href="#component-el">#</a> component.<b>el</b>

The HTML element created by the component [render][] method. Available after the component is mounted.

<a name="user-content-component-model" href="#component-model">#</a> component.<b>model</b>

The [model][] bound to the component


### Creating a component

A component is defined by the [render][] method. However, there optional properties and
methods that can be used to customize construction and lifecycle of a component.
```javascript
var component = {
    model: {...},
    props: [...],
    init (options) {
    },
    render (data, attr) {
    },
    mounted () {
    },
    destroy () {
    }
};
```

The optional ``props`` array can specify a set of html attributes which 
contribute to the component data.
The html properties can contain

* JSON strings
* Model attribute name

#### component.model

A function or an object which specifies the default values of the component model.

Once the component has been mounted, this is becomes the
model associated with the component and therefore an API property
of the component.

Some component have their own model, other they use the model of the parent component.

#### component.init(<i>options</i>)

Hook called once only at the beginning of the component initialisation process, before it is mounted into the DOM.

#### component.render(<i>data, attrs</i>)

This is **the only required hook**. It is called once only while the component is being mounted into the DOM
and must return a single HTMLElement or a selector with one node only.
The returned element replaces the component element in the DOM.
Importantly, this function can also return a [Promise][] which resolve in an HTMLElement or selector.

* **data** is the data object in the component element
* **attrs** is an object containing the key-value of attributes in the component element

#### component.mounted()

Hook called after the component has been mounted in to the DOM.
In this state the component has the full API available
and all its children elements are mounted too.

#### component.destroy()

Called when the component HTML element is removed from the DOM.

### Component API

The most important part of a component is the ``render`` method. This sections
deals with the API available to the component once it is created.
The API is very similar to the [view-api][] since components and views share
the same constructor.

#### component.events

Events object which can be used for registering event listeners or firing events.

#### component.parent

The parent component. If not defined this is the root view, not a component.

#### component.root

The view object the component belongs to.

#### component.uid

Component unique identifier


## Expressions

The text we put inside directive's values are called ``binding expressions``.
In d3-view, a binding expression consists of a single JavaScript expression
but not operations. The difference between expressions and operations is akin
to the difference between a cell in an Excel spreadsheet vs. a proper JavaScript program.

Valid expression are:
```javascript
"The sun"               //  literal
theme                   //  An identifier (a property of a model)
dosomething()           //  A function
[theme, number]         //  Arrays of identifiers
x ? "Hi" : "goodbye"    //  Conditionals
```
and complex combinations of the above
```javascript
user.groups().join(", ")
[theme, user.groups(), "Hi"]
```

### Expressions API

Expression can be created via the javascript API:
```javascript
var expression = viewExpression(<expression string>);
```
#### expression.expr

The original expression string passed to the Expression constructor.

#### expression.eval(model)

Evaluate an expression with data from a given ``model``. The ``model``
can be a [model][] instance or a vanilla object.

#### expression.safeEval(model)

Same as [expression.eval](#expressionevalmodel) but does not throw an
exception if evalutation fails. Instead it logs the error end returns nothing.

#### expression.identifiers()

Array of identifiers (model properties) in the expression.


## Plugins

Plugins, usually, add functionality to a view-model.
There is no strictly defined scope for a plugin but there are typically several
types of plugins you can write:

* Add a group of [components][]
* Add a group of [directives][]
* Add some components methods by attaching them to components prototype.
* Add providers to the ``view.providers`` object

A plugin can be an object with the ``install`` method or a simple
function (same signature as the install method).
```javascript
var myPlugin = {
    install: function (vm) {
        // add a component
        vm.addComponent('alert', {
            model: {
                style: "alert-info",
                text: "Hi! this is a test!"
            },
            render: function () {
                return view.htmlElement('<div class="alert" :class="style" d3-html="text"></div>');
            }
        });
        // add another component
        vm.addComponent('foo', ...);
        
        // add a custom directive
        vm.addDirective('mydir', {
            refresh: function (model, value) {
                ...
            }
        });
    }
}
```

A plugin is installed in a view via the chainable ``use`` method:
```javascript
var vm = d3.view();
vm.use(myPlugin).use(anotherPlugin);
```


### Form Plugin

This library include a form plugin for creating dynamic forms from JSON layouts.
The plugin adds the ``d3form`` [component][] to the view-model:
```javascript
import {view, viewForms} from 'd3-view';

var vm = view().use(viewForms);
```

#### Importing

If you are using [rollup][] to compile your javascript application, the form plugin
will be included in your compiled file only if
```javascript
import {viewForms} from 'd3-view';
```
is present somewhere in your code. Otherwise, it will be eliminated thanks to
tree-shaking.

#### Form API

<a name="user-content-form-setsubmit" href="#form-setsubmit">#</a> form.<b>setSubmit</b>()

Sets the form model ``formSubmitted`` and ``formSubmitted`` reactive attribute to ``true`` and
returns a [Promise][] which resolves in ``true`` or ``false``
depending if the form inputs pass validation.

<a name="user-content-form-isvalid" href="#form-isvalid">#</a> form.<b>isValid</b>()

Check if the form inputs pass validation, return ``true`` or ``false``.

### Bootstrap Plugin

It is possible to use bootstrap layouts for d3 forms by importing and using the ``viewBootstrapForms`` plugin:
```javascript
import {view, viewForms, viewBootstrapForms} from 'd3-view';

var vm = view().use(viewForms).use(viewBootstrapForms);
```

## Providers

**TODO**


## Other Frameworks

In order of complexity

* [Angular](https://angularjs.org/)
* [React](https://facebook.github.io/react/)
* [Vue](http://vuejs.org/)

## D3 plugins

* [d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path)
* [d3-line-chunked](https://github.com/pbeshai/d3-line-chunked)
* [d3-scale-cluster](https://github.com/schnerd/d3-scale-cluster)

[Coverage]: https://circleci.com/api/v1/project/quantmind/d3-view/latest/artifacts/0/$CIRCLE_ARTIFACTS/coverage/index.html?branch=master&filter=successful
[rollup]: http://rollupjs.org/
[Promise]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
[model]: #model
[component]: #components
[components]: #components
[directives]: #directives
[plugins]: #plugins
[view-api]: #view-api
[d3-attr]: https://github.com/quantmind/d3-view/blob/master/src/directives/attr.js
[d3-for]: https://github.com/quantmind/d3-view/blob/master/src/directives/for.js
[d3-html]: https://github.com/quantmind/d3-view/blob/master/src/directives/html.js
[d3-if]: https://github.com/quantmind/d3-view/blob/master/src/directives/if.js
[d3-model]: https://github.com/quantmind/d3-view/blob/master/src/directives/model.js
[d3-on]: https://github.com/quantmind/d3-view/blob/master/src/directives/on.js
[d3-show]: https://github.com/quantmind/d3-view/blob/master/src/directives/show.js
[d3-value]: https://github.com/quantmind/d3-view/blob/master/src/directives/value.js
[d3-selection]: https://github.com/d3/d3-selection
[render]: #render
