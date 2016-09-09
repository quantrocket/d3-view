import {isObject, isString, assign} from 'd3-let';

import field from './field';


const VALIDATORS = ['required', 'minlength', 'maxlength', 'min', 'max'];


//
// Input element
export default assign({

    render: function (data) {
        data = this.inputData(data);
        var el = this.createElement('input')
                .attr('id', data.id)
                .attr('type', data.type || 'text')
                .attr('name', data.name)
                .attr('d3-value', 'value')
                .attr('placeholder', data.placeholder)
                .attr(':required', data.required)
                .attr('d3-validate', 'validators');

        if (isString(data.required)) el.attr('#required', data.required);
        else el.property('required', data.required);

        this.model.inputs[data.name] = this;

        return this.wrap(el);
    }
}, field);


export function validators (structure) {
    let validators = {};
    if (isObject(structure))
        Object.keys(structure).forEach((key) => {
            if (VALIDATORS.indexOf(key) > -1)
                validators[key] = structure[key];
        });
    return validators;
}
