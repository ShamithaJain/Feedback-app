const nodemailer=require('nodemailer');
const config=require('../config')

//
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth: {
    user:config.email.user,
    pass:config.email.pass,
    },
});

const sendFeedbackEmail=(feedback)=>{
    const mailOptions={
        from: config.email.user,
        to: config.email.admin,
        subject: `New Feedback: ${feedback.subject}`,
        html:`
        <h2>New Feedback Received</h2>
        <p><strong>Name: ${feedback.name}</strong>
        <p><strong>Email: ${feedback.email}</strong>
        <p><strong>Subject: ${feedback.subject}</strong>
        <p><strong>Rating: ${feedback.rating}</strong>
        <p><strong>Message: ${feedback.message}</strong>
        `
    }
    return transporter.sendMail(mailOptions)
}
module.exports={sendFeedbackEmail}
