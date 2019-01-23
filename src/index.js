import base from './base.mjml';
console.log(base);

// STEP: appending the compiled html
document.open('text/html');
document.write(base);
document.close();

console.log(document);
