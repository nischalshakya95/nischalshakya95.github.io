let arr = [1, 2, 3];
let output = Array.prototype.reduce.call(arr, function (acc, output) {
    console.log('acc ' , acc);
    console.log('output', output);
    return acc + output;
});
console.log(output);