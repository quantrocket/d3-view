import Directive from '../directive';
import {expression} from '../parser';


//
//  d3-model directive
//  ===================
//
//  Create a new model on the element based on data from parent models
//  This is a special directive and the first to be mounted
export default class extends Directive {

    mount (model) {
        this.el.removeAttribute(this.name);
        var expr = expression(this.expression);
        if (!expr) return;
        if (expr.parsed.type !== expr.codes.IDENTIFIER)
            return this.warn(`d3-model expression support identifiers only, got "${expr.parsed.type}": ${this.expression}`);
        this.model = model.$child(expr.eval(model));
        this.sel.model(this.model);
        model.$setbase(this.expression, this.model);
    }

}
