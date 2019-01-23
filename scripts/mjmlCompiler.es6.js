import mjml2html from 'mjml';
import fs from 'fs';
import path from 'path';
import {registerComponent} from 'mjml-core';

// NOTE: path mapping
const pathToSrc = path.join(process.cwd(), '/src/');

const pathToComponents = path.join(process.cwd(), '/dist/components');
const pathToMjmlbase = path.join(process.cwd(), '/src/base.mjml');
const pathToHtmlResult = path.join(process.cwd(), '/dist/index.html');

// STEP: getting the component list
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};
const components = walkSync(pathToComponents);

// STEP: rgistering the components
components.forEach(d => registerComponent(require(d).default));

// STEP: configuring the mjml compiler
const options = {
  fonts: {},
  keepComments: true,
  beautify: true,
  minify: true,
  validationLevel: 'strinct',
};

function compileMJML() {
  // STEP: getting the mjml codebase
  fs.readFile(pathToMjmlbase, 'utf8', (err, data) => {
    // CHECK: for errors
    if (err) throw err;

    // STEP: compiling the mjml code
    const output = mjml2html(data, options);

    // STEP: writing a new html file
    fs.writeFile(pathToHtmlResult, output.html, err => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
}

// STEP: watch files
fs.watch(pathToSrc, () => compileMJML());
