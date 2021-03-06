import label from './label';
import formGroup from './form-group';
import inputGroup from './input-group';
import submit from './submit';


const bootstrap = {

    input: ['inputGroup', 'label', 'formGroup'],
    textarea: ['label', 'formGroup'],
    select: ['label', 'formGroup'],
    submit: ['submit'],
    wrappers: {
        label,
        formGroup,
        inputGroup,
        submit
    }
};


// Bootstrap theme
export default {

    install: function (view) {
        var d3form = view.components.get('d3form');
        if (d3form)
            d3form.prototype.formTheme = bootstrap;
    }
};
