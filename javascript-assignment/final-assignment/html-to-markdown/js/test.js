let val = '<p>headingOne</p>';
console.log(val.indexOf('<h1>'), val.indexOf('</h1>'));
updatedValue = val.substring(0, val.indexOf('</h1>'));
console.log(val.replace(updatedValue, ''));