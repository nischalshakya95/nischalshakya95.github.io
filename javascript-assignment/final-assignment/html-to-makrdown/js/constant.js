const DOUBLE_NEW_LINE = '\n\n';

const STRONG = '**';

const EM = '_';

const LEADING_NEW_LINE_REG_EXP = /^\n*/;

const TRAILING_NEW_LINE_REG_EXP = /\n*$/;

const blockElements = [
    'address', 'article', 'aside', 'audio', 'blockquote', 'body', 'canvas',
    'center', 'dd', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption',
    'figure', 'footer', 'form', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'header', 'hgroup', 'hr', 'html', 'isindex', 'li', 'main', 'menu', 'nav',
    'noframes', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table',
    'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul', 'strong', 'em'
];