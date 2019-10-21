let doc =new DOMParser().parseFromString('<div><b>Hello!</b></div>', 'text/html');
console.log(doc.body.firstChild);