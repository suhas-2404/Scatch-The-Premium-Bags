const express=require('express');
const router=express.Router();
const Owner=require('../models/owner-model');
require('dotenv').config();
const bcrypt=require('bcrypt');

if(process.env.NODE_ENV === 'development'){
    router.post('/create',async(req,res)=>{
        let owner=await Owner.find();
        if(owner.length>0){
            return res.status(400).send('Owner already exists');
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async(err, hash) =>{
                let createdOwner=await Owner.create({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: hash              
                  });
                res.status(201).send(createdOwner);
            });
        });    
    });
}

router.get('/admin',(req,res)=>{
    res.render('createproducts',{success:[]});
});


module.exports=router;