const express=require('express');
const router=express.Router();

const {registerUser}=require('../controller/authController');
const {userLogin}=require('../controller/authController');

router.get('/',(req,res)=>{
    res.send('Owner Router');
});

router.post('/register',registerUser);
router.post('/login',userLogin);
module.exports=router;