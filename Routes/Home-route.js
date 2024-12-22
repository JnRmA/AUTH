const express = require('express')
const midd= require('../middleware/Authentication')
const Authentication = require('../middleware/Authentication')
const IsAdmin = require('../middleware/admin-route')

const router = express.Router()
router.get('/home', Authentication, (req, res)=>{
    const{username, userId, role }= req.userInfo
    res.status(400).json({
        success: true,
        message : 'Welcome to the homepage',
        user:{
            _id : userId,
            username,
            role
        }
    })
})



router.get('/Lecturer', Authentication, IsAdmin, (req, res)=>{
    const{username, userId, role }= req.user
   return res.status(200).json({
        success: true,
        message : 'Welcome  Admin',
        user:{
            _id : userId,
            username,
            role
        }
    })
})

module.exports=router