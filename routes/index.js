const express=require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const router=express.Router();

router.get('/',(req,res)=>{
    let error = req.flash('error');
    res.render("index", { error });
});

router.get('/shop',isLoggedIn,async(req,res)=>{
    let products=await productModel.find();
    res.render('shop',{products});
});

router.get('/addtocart/:id',isLoggedIn,async(req,res)=>{
    let user=userModel.findOne({email:req.user.email});
});

module.exports=router;