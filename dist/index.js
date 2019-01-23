"use strict";

var _mjml = _interopRequireDefault(require("mjml"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mjmlCore = require("mjml-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE: path mapping
var pathToSrc = _path.default.join(process.cwd(), '/src/');

var pathToComponents = _path.default.join(process.cwd(), '/dist/components');

var pathToMjmlbase = _path.default.join(process.cwd(), '/src/base.mjml');

var pathToHtmlResult = _path.default.join(process.cwd(), '/dist/index.html'); // STEP: getting the component list


var walkSync = function walkSync(dir) {
  var filelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _fs.default.readdirSync(dir).forEach(function (file) {
    filelist = _fs.default.statSync(_path.default.join(dir, file)).isDirectory() ? walkSync(_path.default.join(dir, file), filelist) : filelist.concat(_path.default.join(dir, file));
  });

  return filelist;
};

var components = walkSync(pathToComponents); // STEP: rgistering the components

components.forEach(function (d) {
  console.log(d);
  (0, _mjmlCore.registerComponent)(require(d).default);
}); // STEP: configuring the mjml compiler

var options = {
  fonts: {},
  keepComments: true,
  beautify: true,
  minify: true,
  validationLevel: 'strinct'
};

function compileMJML() {
  // STEP: getting the mjml codebase
  _fs.default.readFile(pathToMjmlbase, 'utf8', function (err, data) {
    // CHECK: for errors
    if (err) throw err; // STEP: compiling the mjml code

    var output = (0, _mjml.default)(data, options); // STEP: writing a new html file

    _fs.default.writeFile(pathToHtmlResult, output.html, function (err) {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
} // STEP: watch files


_fs.default.watch(pathToSrc, function () {
  return compileMJML();
});