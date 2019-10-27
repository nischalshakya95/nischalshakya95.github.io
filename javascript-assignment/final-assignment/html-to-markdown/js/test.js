let linkMd = '[A link](https://markdowntohtml.com/) ';

let regexp = /[\[]{1}([^\]]+)[\]]{1}[(]{1}([^)"]+)("(.+)")?[)]{1}/g;

console.log(linkMd.replace(regexp, '<a href = "$2" title="$4">$1</a>'));
