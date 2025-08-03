const mongoose=require('mongoose');
const config=require('../config')

const connectDB=async()=>{
    try {
        await mongoose.connect(config.MONGOURI);
        console.log('MongoDB connected..')
    } catch (error) {
        console.log(`Error connecting to mongoDB ${error.message}`)
    }
}
module.exports=connectDB