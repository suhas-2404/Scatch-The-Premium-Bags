const express=require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const router=express.Router();

router.get('/',(req,res)=>{
    let error = req.flash('error');
    res.render("index", { error , loggedin : false });
});

router.get("/shop", async (req, res) => {
    try {
        let { sortby, category, availability, discount, price } = req.query;

        let query = {};

        // Category Filter (If needed, adjust based on how categories are stored)
        if (category) {
            if (category === "new") {
                query.isNew = true;  // Only fetch new collection products
            } else if (category === "discount") {
                query.discount = { $gt: 0 }; // Fetch only discounted products
            }
        }

        // Availability Filter (Assuming products with price > 0 are in stock)
        if (availability) query.price = { $gt: 0 };

        // Discount Filter (Only products with a discount greater than 0)
        if (discount) query.discount = { $gt: 0 };

        // Price Range Filter
        if (price) query.price = { $lte: parseInt(price) };

        // Sorting Logic
        let sortQuery = {};
        if (sortby === "newest") {
            sortQuery._id = -1; // Sorting by MongoDB ObjectID (Newest first)
        } else {
            sortQuery.discount = -1; // Prioritizing higher discounts
        }

        // Fetch Products with Filters
        const products = await productModel.find(query).sort(sortQuery);

        res.render("shop", {
            products,
            sortby,
            category,
            availability,
            discount,
            price
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
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