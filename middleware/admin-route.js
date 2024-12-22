const express = require('express')
const user = require('../models/user')

const IsAdmin=(req, res,next)=>{
    if( req.user.role !== 'admin' ){
        console.log(req.user)
         return res.status(401).json({
            success:false,
            message: 'Admin rights required for access '

        })  
    }
    next()
}
module.exports = IsAdmin

