const DOUBLE_NEW_LINE = '\n\n';

const STRONG = '**';

const EM = '_';

const LEADING_NEW_LINE_REG_EXP = /^\n*/;

const TRAILING_NEW_LINE_REG_EXP = /\n*$/;

const HEADING_ONE_VALIDATION_REGEX = /\s*(?!^<h1>)(?!<\/h1>$)(<\/?\w+>)/im;

const HEADING_TWO_VALIDATION_REGEX = /\s*(?!^<h2>)(?!<\/h2>$)(<\/?\w+>)/im;

const HEADING_THREE_VALIDATION_REGEX = /\s*(?!^<h3>)(?!<\/h3>$)(<\/?\w+>)/im;

const HEADING_FOUR_VALIDATION_REGEX = /\s*(?!^<h4>)(?!<\/h4>$)(<\/?\w+>)/im;

const HEADING_FIVE_VALIDATION_REGEX = /\s*(?!^<h5>)(?!<\/h5>$)(<\/?\w+>)/im;

const HEADING_SIX_VALIDATION_REGEX = /\s*(?!^<h6>)(?!<\/h6>$)(<\/?\w+>)/im;

const PARAGRAPH_VALIDATION_REGEX = /\s*(?!<\/?p>)(<\/?h[1-6]*>|<\/?ul>|<\/?li>|<\/?div>)/;

const REMOVE_SPACE_BEFORE_AFTER_ELEMENT = /\s(?!<\/?\w+>)\s/igm;

const SPLIT_REGEX = /(<[a-z0-9]*\/?>.+?<\/[a-z0-9]*>\s+?)/igm;



