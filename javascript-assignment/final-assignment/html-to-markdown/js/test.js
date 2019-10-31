let str = '<h2><p> Heading One Heading Two </p></h2>';

let regexExp = /\s(?!<\/?\w+>)\s/igm;

console.log(str.replace(regexExp, ''));