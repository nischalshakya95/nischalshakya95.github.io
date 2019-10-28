let str = '<h1>nischal shakya<h2></h1>';
let regexOne = /(<h1>\w(<|>)|<\/h1>)/ig;
let regex = /\s*(?!^<h1>)(?!<\/h1>$)(<h[1-6]>.*|<\/h[1-6]>.*)/ig;
console.log(regexOne.test(str));