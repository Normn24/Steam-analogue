const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Customer'); 
require('dotenv').config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

router.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_OR_KEY, { expiresIn: '1h' });
    const url = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding-bottom: 20px;
          }
          .header h1 {
              color: #333;
          }
          .content {
              line-height: 1.6;
          }
          .content p {
              color: #555;
          }
          .content a {
              color: #3498db;
              text-decoration: none;
              font-weight: bold;
          }
          .content a:hover {
              text-decoration: underline;
          }
          .footer {
              text-align: center;
              padding-top: 20px;
              color: #888;
              font-size: 12px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Password Reset Request</h1>
          </div>
          <div class="content">
              <p>You requested a password reset.</p>
              <p>Click the link below to reset your password:</p>
              <p><a href="${url}">Reset Your Password</a></p>
          </div>
          <div class="footer">
              <p>If you did not request a password reset, please ignore this email.</p>
              <p>Thank you, <br/>PetProjectTeam</p>
          </div>
      </div>
  </body>`
    });

    res.status(200).json({ message: 'Password reset link sent to your email account' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    
  }
});


router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_OR_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid token or user does not exist' });
    }
    user.password = await bcrypt.hash(newPassword, 10); 
    await user.save();
    res.status(200).json({ message: 'Password has been reset' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

