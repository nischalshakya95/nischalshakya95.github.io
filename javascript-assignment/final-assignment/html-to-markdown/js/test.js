let date = '<h1><strong>hello world</strong></h1> <h2>world<br>hello</h2> <ul>' +
    '<li>list one</li>' +
    '</ul>';

let str = '<h1>heading one</h1>';

let validRegex = /(?!^<h1>)(?!<\/h1>$)(<\/?h[1-6])/im;

console.log(validRegex.test(str));
console.log(validRegex.test(str));
console.log(validRegex.test(str));
