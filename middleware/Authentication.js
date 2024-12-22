const jwt = require('jsonwebtoken');
const express = require('express');

const Authentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);

  const Token = authHeader && authHeader.split(' ')[1];

  console.log('Authorization header:', authHeader); // Log the full Authorization header
  // console.log('Extracted token:', Token);
  if (!Token) {
    console.log(Token);
    return res.status(401).json({
      success: false,
      message: 'User Credentials invalid T.R Again',
    });

  }

  try {
    const tokendecoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
    // console.log(tokendecoded)
    // const {id, username,role}=tokendecoded
    // if (!id || !username || !role) {
    //   throw new Error('Missing required token fields');
    // }

    req.user = tokendecoded
     console.log(tokendecoded)
    // { 
    //   userId: tokendecoded.id,
    //   username: tokendecoded.username,
    //   role: tokendecoded.role}  

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: 'User Credentials invalid Pls Login Again ',
    });
  }
};
module.exports = Authentication;
