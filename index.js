export {default as view} from './src/core/view';
export {default as viewModel} from './src/model/main';
export {default as viewExpression} from './src/parser/expression';
export {default as viewReady} from './src/utils/dom';
export {default as viewProviders} from './src/utils/providers';
export {default as viewWarn} from './src/utils/warn';
export {default as viewRequire} from './src/utils/require';
export {default as viewForms} from './src/forms/plugin';
export {default as viewBootstrapForms} from './src/forms/bootstrap/plugin';
export {default as viewUid} from './src/utils/uid';
export {default as viewDebounce} from './src/utils/debounce';
export {version as viewVersion} from './package.json';

export {
    htmlElement as viewElement,
    compile as viewTemplate,
    html as viewHtml
} from './src/utils/html';

