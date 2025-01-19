const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],  
        default: []  
    },
    orders:{
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
});

module.exports = mongoose.model('User', userSchema);