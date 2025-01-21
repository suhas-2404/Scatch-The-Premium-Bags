const express=require('express');
const router=express.Router();
const userModel = require('../models/user-model');

const {registerUser}=require('../controller/authController');
const {userLogin}=require('../controller/authController');
const {userLogout}=require('../controller/authController');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/',(req,res)=>{
    res.send('Owner Router');
});

router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);  // Assuming `req.user` contains the logged-in user's information
        res.render('profile', { user }); // Render the profile page and pass the user data
    } catch (err) {
        res.status(500).send('Error fetching user data: ' + err.message);
    }
});

router.post('/register',registerUser);
router.post('/login',userLogin);
router.get('/logout',userLogout);

module.exports=router;