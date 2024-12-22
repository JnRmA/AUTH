const mongoose = require('mongoose');
const connectTomongoose = async()=>{

    try{ 
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database connected succesfuly')

    }catch(e){
        console.error('mongodb connection failed')
        process.exit (1)
    }

    
}
module.exports = connectTomongoose;