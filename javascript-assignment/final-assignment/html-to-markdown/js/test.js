let date = '<h1><strong>hello world</strong></h1> <h2>world<br>hello</h2> <a href=""></a>';

let regex = /(<[a-z0-9]*\/?>.+?<\/[a-z0-9]*>\s+?)/igm;

console.log(date.match(/<\/?\s*[^>]*>/gim));

console.log(date.match(/(<\/?\s*.+[^>]*>)/gim));

console.log(date.split(regex));
