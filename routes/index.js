const express=require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const router=express.Router();

router.get('/',(req,res)=>{
    let error = req.flash('error');
    res.render("index", { error , loggedin : false });
});

router.get('/shop',isLoggedIn,async(req,res)=>{
    let products=await productModel.find();
    res.render('shop',{ products });
});

router.get('/cart',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate('cart');
    res.render('cart',{user});
});

router.get('/addtocart/:id',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash('success','Product added to cart');
    res.redirect('/shop');
});

module.exports=router;