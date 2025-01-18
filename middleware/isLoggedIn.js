const jwt=require('jsonwebtoken');
const userModel=require('../models/user-model');

const isLoggedIn = async function(req,res,next){
    if(!req.cookies.token){
        req.flash('error','Please login first');
        return res.redirect('/');
    }
    try{
        let token=req.cookies.token;
        let decoded=jwt.verify(token,process.env.JWT_KEY);
        let user=await userModel.findById(decoded.id).select('-password');
        if(user){
            req.user=user;
            next();
        }
        else{
            res.redirect('/');
        }
    }
    catch(err){
        req.flash('error','Something went wrong');
        res.redirect('/');
    }
}

module.exports= isLoggedIn;