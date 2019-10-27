let val = '<h1>headingOne<h2>headingtwo</h2></h1><h1>headingone</h1>';
console.log(val.indexOf('<h1>'), val.indexOf('</h1>'));
updatedValue = val.substring(0, val.indexOf('</h1>'));
console.log(val.replace(updatedValue, ''));
console.log(updatedValue.substring(updatedValue.indexOf('<h2>'), updatedValue.indexOf('</h2>')));