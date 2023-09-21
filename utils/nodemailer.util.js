const nodemailer = require('nodemailer');
require('dotenv').config()

async function sendMail (email) {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS    
        }
    });
     
    let mailDetails = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Test mail',
        text: 'Official invitation to join the organization'
    };
     
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports = { sendMail }