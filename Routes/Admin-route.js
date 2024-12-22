
const Authentication = require('../middleware/Authentication')
const IsAdmin = require('../middleware/admin-route')

const router = express.Router()
router.get('/Lecturer', Authentication, IsAdmin, (req, res)=>{
    const{username, userId, role }= req.user
    res.status(400).json({
        success: true,
        message : 'Welcome to Admin',
        user:{
            _id : userId,
            username,
            role
        }
    })
})
module.exports=router