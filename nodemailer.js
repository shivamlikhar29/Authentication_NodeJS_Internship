const nodemailer = require('nodemailer');
 
const sendEmail = (email,newPassword) => {

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
 
let mailDetails = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your New Password',
    html: `<h1>Welcome</h1><p>${newPassword}</p>`
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
        console.log(err);
    } else {
        console.log('Email sent successfully');
    }
});

}

module.exports = sendEmail