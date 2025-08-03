require('dotenv').config();
const express=require('express');
const path=require('path');
const nodemailer=require('nodemailer');
const Feedback=require('./models/Feedback');
const mongoose = require('mongoose');
const connectDB = require("./utils/db");
const { sendFeedbackEmail } = require('./utils/emailService');


//connect to database
connectDB();

//express instance
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));


//connect db
mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log('Connected to mongodb');
        })
        .catch((error)=>{
            console.log(`Error: connecting to mongodb:${error.message}`)
        })



app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about',{
    title:"About",
    currentPage:"about",
  });
});

app.get('/admin', async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // fetch all feedback entries
    res.render('admin', {
      title: "Admin",
      currentPage: "admin",
      feedbacks // pass this to EJS
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/Submit', (req, res) => {
res.render('feedback-form',{
    title: "Feedback",
    currentPage: "feedback",
     });
});

//send feedback
app.post('/submit-feedback',async(req,res)=>{
    try{
        const feedback=new Feedback(req.body)
        await feedback.save();
        //send the email
        await sendFeedbackEmail(feedback)
        res.render('success', { message:"Thank you for your feedback"})
    } catch(error) {
        console.log('Error submitting feedback',error)
        res.render('error',{message:'An error occurred submitting your feedback',})
    }
})

//start the server
const PORT=process.env.PORT || 4000
app.listen(PORT,console.log(`Server is running on port ${PORT}`));
