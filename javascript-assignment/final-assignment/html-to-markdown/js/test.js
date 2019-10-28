let val = '<h1>headingOne</h1><p><h2>hello world</h2>headingOne</p><p>paragraph</p></h2>';
let match = val.match(/<h2>(.+)/gi);
console.log(match[0].endsWith('</h2>'));
