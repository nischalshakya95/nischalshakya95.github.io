let date = '<h1><strong>hello world</strong></h1> <h2>world<br>hello</h2> <ul>' +
    '<li>list one</li>' +
    '</ul>';

let str = '<h1><h2></h2>headingOne</h1>';

let validRegex = /<h1> <[^a-z0-9]> <\/h1>/igm;

console.log(validRegex.test(str));

// let regex = /(<[a-z0-9]*\/?>.+?<\/[a-z0-9]*>\s+?)/igm;
//
// console.log(date.match(/<\/?\s*[^>]*>/gim));
//
// console.log(date.match(/(<\/?\s*.+[^>]*>)/gim));
//
// console.log(date.split(regex));
