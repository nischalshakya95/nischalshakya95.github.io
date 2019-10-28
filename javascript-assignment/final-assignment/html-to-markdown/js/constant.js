const DOUBLE_NEW_LINE = '\n\n';

const STRONG = '**';

const EM = '_';

const LEADING_NEW_LINE_REG_EXP = /^\n*/;

const TRAILING_NEW_LINE_REG_EXP = /\n*$/;

const HEADING_ONE_REGEX = /^(.+)\n=+/gm;

const HEADING_ONE_REPLACE = '<h1>$1</h1>';

const HEADING_TWO_REGEX = /^(.+)\n-+/gm;

const HEADING_TWO_REPLACE = '<h2>$1</h2>';

const HEADING_THREE_REGEX = /[#]{3}(.+)/g;

const HEADING_THREE_REPLACE = '<h3>$1</h3>';

const HEADING_FOUR_REGEX = /[#]{4}(.+)/g;

const HEADING_FOUR_REPLACE = '<h4>$1</h4>';

const HEADING_FIVE_REGEX = /[#]{5}(.+)/g;

const HEADING_FIVE_REPLACE = '<h5>$1</h5>';

const HEADING_SIX_REGEX = /[#]{6}(.+)/g;

const HEADING_SIX_REPLACE = '<h6>$1</h6>';

const BLOCKQUOTE_REGEX = /^&gt;(.+)/gm;

const BLOCKQUOTE_REPLACE = '<blockquote>$1</blockquote>';

const IMAGE_REGEX = /!\[([^\]]+)]\(([^)]+)\)/g;

const IMAGE_REPLACE = '<img src=$2 alt=$1 />';

const LINK_REGEX = /[\[]{1}([^\]]+)[\]]{1}[(]{1}([^)"]+)("(.+)")?[)]{1}/g;

const LINK_REPLACE = '<a href="$2" title="$4">$1</a>';

const HEADING_VALIDATION_REGEX = /\s*(?!^<h1>)(?!<\/h1>$)(<h[1-6]>|<\/h[1-6]>)/ig;



