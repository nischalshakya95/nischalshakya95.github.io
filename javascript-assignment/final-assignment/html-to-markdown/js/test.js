let date = '<h1> hello world </h1> <h2>world hello</h2> <p><div></div>paragraph</p> ';

console.log(date.match(/<\/?\s*[^>]*>/gim));

console.log(date.match(/(<\/?\s*.+[^>]*>)/gim));

console.log(date.match(/(<\w+>(.+)<\/\w+>)\s+/igm));