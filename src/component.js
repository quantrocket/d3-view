import {isFunction, isObject, self} from 'd3-let';
import {select} from 'd3-selection';
import {map} from 'd3-collection';
import Directive from './directive';
import Model from './model';
import {warn} from './utils';

//
//  d3 base view class
export class Base {

    constructor(options) {
        options = map(options);
        self.set(this, {});
        var el = options.get('el');
        if (!el) this.warn('"el" element is required when creating a new d3.View');
        else {
            var d3el = isFunction(el.node) ? el : select(el);
            var element = d3el.node();
            if (!element) this.warn(`could not find ${el} element`);
            else this._init(element, options);
        }
    }

    created () {}

    beforeMount () {}

    mounted () {}

    warn(msg) {
        if (this.parent) this.parent.warn(msg);
        else warn(msg);
    }

    get isd3() {
        return true;
    }

    get model () {
        return self.get(this);
    }

    get uid () {
        return this.model.$uid;
    }

    get el () {
        return this.model.$el;
    }

    get sel () {
        return select(this.el);
    }

    get parent () {
        var p = this.model.$parent;
        return p ? p.$vm : undefined;
    }

    get components () {
        return this.model.$components;
    }

    get root () {
        let parent = this.parent;
        if (parent) return parent.root;
        else return this;
    }

    get isMounted () {
        return this.model.$mounted;
    }

    mount () {
        if (this.isMounted) this.warn('already mounted');
        else if (this.el) {
            this.beforeMount();
            this.model.$mounted = true;
            this.mountElement(this.el);
            this.mounted();
        }
        return this;
    }

    createElement (tag) {
        return select(document.createElement(tag));
    }

    mountElement (el, model) {
        model = model || this.model;
        // Set the model in the element if required
        if (model !== this.model && model.$vm !== this) this.warn('model of a child element should have the same view object');

        var vm = this,
            components = model.$get('$components'),
            dirs = model.$get('$directives');

        // create directive for this element
        var directives = [];
        for (let i=0; i<el.attributes.length; ++i) {
            let attr = el.attributes[i],
                dirName = attr.name.substring(0, 3) === 'd3-' ? attr.name.substring(3) : null,
                Directive = dirs.get(dirName);
            if (Directive) directives.push(new Directive(model, el, attr));
        }
        if (directives.length)
            el.__d3_directives__ = directives.sort((d) => {return -d.priority;});

        if (el.parentNode || el === this.el)
            select(el).selectAll('*').each(function() {
                // mount components
                var Component = components.get(this.tagName.toLowerCase());

                if (Component)
                    new Component({
                        el: this,
                        parent: model
                    }).mount();
                else
                    vm.mountElement(this, model);
            });

        // mount directive
        directives.forEach((d) => {
            d.mount();
        });
    }

    _init (element, options) {
        init.call(this, element, options);
    }
}


// d3 view component
class Component extends Base {

    mount () {
        if (this.isMounted) this.warn('already mounted');
        else {
            this.beforeMount();
            this.model.$mounted = true;
            this.mountElement(this.el);
            var el = this.render();
            if (!el || el.size() !== 1) this.warn('render function must return a single HTML node');
            var node = el.node();
            node.__d3view__ = this;
            this.el.parentNode.appendChild(node);
            select(this.el).remove();
            this.model.$el = node;
            this.mounted();
        }
        return this;
    }
}


function init(element, options) {
    // model containing binding data
    var vm = this;
    var parent = options.get('parent');
    var model = new Model(this, options.get('model'));
    if (parent) model.$parent = parent;
    model.$el = element;
    self.set(this, model);
    //
    model.$directives = map(parent ? parent.$directives : this.constructor.directives);
    model.$components = map(parent ? parent.$components : this.constructor.components);
    model.$mounted = false;
    //
    map(options.get('directives')).each((directive, key) => {
        if (isObject(directive))
            // Create a new directive class
            model.$directives.set(key, class extends Directive {

                init () {
                    for (key in directive)
                        this[key] = directive[key];
                }
            });
        else
            vm.warn(`"${key}" not a valid directive. Must be a object with some of "create", "mount" and "destroy" functions`);
    });
    //
    map(options.get('components')).each((component, key) => {
        if (isFunction(component)) component = {render: component};
        if (isObject(component) && isFunction(component.render))
            // Create a new directive class
            model.$components.set(key, class extends Component {

                _init (element, options) {
                    for (key in component)
                        this[key] = component[key];
                    init.call(this, element, options);
                }

            });
        else
            vm.warn(`"${key}" not a valid component. Must be a function or an object with render function`);
    });
    this.created();
}
