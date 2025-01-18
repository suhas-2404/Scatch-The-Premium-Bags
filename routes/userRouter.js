const express=require('express');
const router=express.Router();

const {registerUser}=require('../controller/authController');
const {userLogin}=require('../controller/authController');
const {userLogout}=require('../controller/authController');

router.get('/',(req,res)=>{
    res.send('Owner Router');
});

router.post('/register',registerUser);
router.post('/login',userLogin);
router.get('/logout',userLogout);

module.exports=router;