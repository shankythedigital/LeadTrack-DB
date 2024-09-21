// emailService.js
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const OAuth2 = google.auth.OAuth2;
const gaxios = require('../config/gaxiosConfig');

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send'],
});


async function sendEmail(recipientEmail,subject,text, html) {
  try {
    const tokens = await oauth2Client.refreshAccessToken();
    const accessToken = tokens.credentials.access_token;

    console.log('Access Token:', accessToken); // Check if the access token is defined

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken, // Use the manually obtained access token
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: subject,
      text: text,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email', error);
  }
}

/*
async function sendEmail(recipientEmail,subject,text, html) {
  try {
    // const accessTokenResponse = await oauth2Client.getAccessToken({ gaxios });
    // const accessToken = accessTokenResponse.token;
    
    
    const accessTokenResponse = await oauth2Client.getAccessToken({ gaxios });
    console.log('Access Token Response:', accessTokenResponse);

    const accessToken = accessTokenResponse?.token;
    console.log('Access Token:', accessToken);

    if (!accessToken) {
      throw new Error('Failed to obtain access token');
    }


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject:subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email', error);
  }
}
*/
module.exports = { sendEmail };
