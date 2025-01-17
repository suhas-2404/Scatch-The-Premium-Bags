const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const cookieParser=require('cookie-parser');
const ownersRouter=require('./routes/ownersRouter');
const userRouter=require('./routes/userRouter');
const productRouter=require('./routes/productRouter');

const db=require('./config/mongoose-connection');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));


app.use('/owners',ownersRouter);
app.use('/users',userRouter);
app.use('/products',productRouter);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});