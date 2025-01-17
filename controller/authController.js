const userModel=require('../models/user-model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {generateToken}=require('../utils/generateToken');

module.exports.registerUser = async function registerUser(req,res){
    try{
        let user=await userModel.findOne({email:req.body.email});
        if(user){
            return res.status(400).send('User already exists');
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async(err, hash) =>{
                let user=await userModel.create({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: hash
                });
              let token=generateToken(user);
              res.cookie('token',token);
              res.send("User created successfully");  
            });
        });   
    }
    catch(err){
        res.send(err.message);
    } 
}


module.exports.userLogin = async function userLogin(req,res){
    try{
        let user=await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(400).send('User does not exist');
        }   
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(result){
                let token=generateToken(user);
                res.cookie('token',token);
                res.send('User logged in successfully');
            }
            else{
                res.status(400).send('Invalid credentials');
            }
        });
    }
    catch(err){
        res.send(err.message);
    }
}

