"use strict";

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transporter = _nodemailer.default.createTransport({
  service: 'gmail',
  auth: {
    user: 'nicola.bertelloni@gmail.com',
    pass: 'n@67541238'
  }
});

var pathToHtmlResult = _path.default.join(process.cwd(), '/dist/index.html');

_fs.default.readFile(pathToHtmlResult, 'utf8', function (err, data) {
  // CHECK: for errors
  if (err) throw err;
  var mailOptions = {
    from: 'nicola.bertelloni@fifthbeat.com',
    to: 'nicola.bertelloni@gmail.com',
    subject: 'Sending Email using Node.js',
    html: data
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});