let str = "<h1>hello world</h1> <h2>world hello</h2>";
let n = str.split(/[a-z1-6](.*)/gm);
console.log(n);