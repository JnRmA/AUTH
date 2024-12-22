const mongoose =require('mongoose');
const { type } = require('os');
const UserSchema= new mongoose.Schema(
    {
        username: {
            type: String,
            required : true,
            unique: true, 
         },
         
        email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
            },

         password :{
            type: String,
            required:true,

         },
         role :{
            type : String,
            enum: ['user','admin'],
            default:'user', 
         }

         
    }, {timestamps : true}
);
module.exports = mongoose.model('user',UserSchema);