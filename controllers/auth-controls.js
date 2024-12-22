// register controller
//  const user = require('../models/user');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const createToken = (id,username,role) => {
  return jwt.sign({ id,username,role }, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });
};

const ResgisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  checkin if user already exists
    const UserExists = await User.findOne({ $or: [{ username }, { email }] });
    if (UserExists) {
      return res.status(404).json({
        success: false,
        message: ' username or email already in use',
        data: req.body,
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);
    //    create new user

    
    const NewlyCreatedUser = new User({
        username,
        email,
        password: hashedPasword,
    });
    await NewlyCreatedUser.save();
    const token = createToken(NewlyCreatedUser._id.toString());
    if (NewlyCreatedUser) {
        res.status(201).json({
            success: true,
            message: 'account created succesfully',
             token
        });
    } else {
      res.status(404).json({
        success: false,
        message: 'user bot created try again',
      });
    }
  } catch (e) {
    console.error;
  }
};

// login controller
// const LoginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Checking if the user exists
//         const user = await user.findOne({ email }); // Ensure 'User' is the correct model name
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email or password invalid',
//             });
//         }

//         // Checking if the password is correct
//         const isPassword = await bcrypt.compare(password, user.password);
//         if (!isPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email or password invalid',
//             });
//         }

//         // Generate JWT token
//         const accessToken = jwt.sign(
//             {
//                 userID: user._id, // MongoDB default ID field
//                 username: user.username,
//                 // role: user.role, // Uncomment if role is used
//             },
//             process.env.JWT_SECRET_KEY,
//             { expiresIn: '9m' }
//         );

//         // Successful login response
//         res.status(200).json({
//             success: true,
//             message: 'Logged in successfully',
//             accessToken,
//         });
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({
//             success: false,
//             message: 'An error occurred while processing your request',
//         });
//     }
// };

const LoginUser = async (req, res) => {
  const { username, password } = req.body;
  const newUsername = username.trim();

  try {
    // console.log('Login attempt:', { email, password });
    // checking if it exits
    const user = await User.findOne({ username });
    // console.log('User document retrieved:', user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'username or password invalid',
      });
    }
    // console.log('Hashed password from DB:', user.password);
    //  checking if password is correct
    const Ispassword = await bcrypt.compare(password, user.password);
    if (!Ispassword) {
      return res.status(400).json({
        success: false,
        message: 'username or password invalid',
      });
      // console.log('Passwordmatch:', Ispassword);
    }

    const token = createToken(user._id.toString(),user.role.toString(),user.username.toString());

    // console.log(token, user._id.toString());

    if (!process.env.JWT_SECRET_KEY) {
      console.warn(
        'Warning: JWT_SECRET_KEY is not defined. Using a default value.'
      );
    }

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user,
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request',
    });
  }
};
const simpleG1 = (req, res) => {
  res.status(404).json({
    success: false,
    message: ' this is working ',
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'email or password invalid ',
    });
  }
  const passcode = await bcrypt.compare(password, user.password);
  if (!passcode) {
    return res.status(400).json({
      success: false,
      message: 'email or password invalid ',
    });
  }

  const kk1 = jwt.sign(
    {
      ID: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '5m',
    }
  );

  res.status(200).json({
    success: true,
    message: 'welcome back ',
    kk1,
  });
};
const board = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is missing' });
    }

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(user);

    res.json({
        id: user._id,
        name: user.username,
        email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { ResgisterUser, LoginUser, simpleG1, signin, board };
