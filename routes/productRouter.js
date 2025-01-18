const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');
const Product=require('../models/product-model');

router.post('/create',upload.single('image'),async(req,res)=>{
    let products=await Product.create({
        image: req.file.buffer,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        bgcolor: req.body.bgcolor,
        panelcolor: req.body.panelcolor,
        textcolor: req.body.textcolor
    });
    req.flash('success','Product created successfully');
    res.redirect('/owners/admin');    

});

module.exports=router;