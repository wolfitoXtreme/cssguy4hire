const express = require('express');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const { check, validationResult } = require('express-validator');

const compression = require('compression');
const path = require('path');
require('dotenv').config();

const { en: translations } = require('./src/translations/translations.json');
const project = require('./package.json');

const { name: projectName } = project;

const port = process.env.PORT || 8080;

const transport = {
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log('transporter error: ', error);
  } else {
    console.log('Server is ready to take messages, ', success);
  }
});

const validateToken = async (token) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: 'POST'
    }
  ).then((response) => {
    return response.json();
  });

  const { success } = await response;

  return success;
};

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.post(
  '/send',
  [
    check('name').not().isEmpty().trim().escape(),
    check('company').not().isEmpty().trim().escape(),
    check('email').not().isEmpty().isEmail().normalizeEmail(),
    check('subject').not().isEmpty().trim().escape(),
    check('comments').not().isEmpty().trim().escape()
  ],
  async (req, res, next) => {
    const isHuman = await validateToken(req.body.token);

    if (!isHuman) {
      return res.status(400).json({ errors: ['no human'] });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('cannot send, encounter field errors...');
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      body: { name, company, email, subject, comments }
    } = req || {};

    const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
    <html>
    <head>
    </head>
    <body bgcolor="#ffffff" text="#000000">

    <div style="font: normal 12px/normal Arial, Helvetica, sans-serif; color: #4E4E4E;">

      <p style="margin: 0px; padding-bottom: 5px;">
        <strong>Contact details:</strong>
      </p>

      ---
      <br>

      <ul>
        <li><strong>Name: </strong>${name}</li>
        <li><strong>Company: </strong>${company}</li>
        <li><strong>E-mail: </strong>${email}</li>
        <li><strong>Subject: </strong>${
          translations[`contact-form-${subject}`]
        }</li>
        <li><strong>Comments: </strong><br />${comments}</li>
      </ul>

      ---
      <br>

    </div>

    </body>
    </html>
  `;

    const mail = {
      from: `Contact form <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `Contact from ${translations['site']}`,
      html
    };

    transporter.sendMail(mail, (error, data) => {
      console.log('transporter sending email...', mail);
      if (error) {
        console.log('error: ', error);
        res.json({
          status: 'fail',
          error: error.response
        });
      } else {
        res.json({
          status: 'success'
        });
      }
    });
  }
);

app.listen(port, () => {
  console.log(
    projectName.toUpperCase() + ' - server is started!!, port: ',
    port
  );
});
