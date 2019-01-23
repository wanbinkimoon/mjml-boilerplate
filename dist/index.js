"use strict";

var _base = _interopRequireDefault(require("./base.mjml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_base.default); // STEP: appending the compiled html

document.open('text/html');
document.write(_base.default);
document.close();
console.log(document);
