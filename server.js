require('dotenv').config();
// console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY); 
const express = require ('express');
const connectToDB = require('./database/db.js');
const Routes = require('./Routes/Auth_routes.js')
const IsAdminroute= require('./middleware/admin-route')
const AUT= require('./middleware/Authentication')
const route = require('./Routes/Home-route.js')

const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));

 connectToDB();

app.use(express.json())

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use("",Routes);
app.use("",route);
console.error();


const Port = process.env.Port||3000;
app.listen(Port, ()=>{
    console.log(`listening to server on ${Port}`)
})