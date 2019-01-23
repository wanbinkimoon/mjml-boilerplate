import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: '',
  },
});

const pathToHtmlResult = path.join(process.cwd(), '/dist/index.html');

fs.readFile(pathToHtmlResult, 'utf8', (err, data) => {
  // CHECK: for errors
  if (err) throw err;

  const mailOptions = {
    from: '',
    to: '',
    subject: '### Email Test UI ###',
    html: data,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
