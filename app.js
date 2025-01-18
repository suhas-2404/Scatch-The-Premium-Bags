const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash'); // connect-flash is a package that allows you to store messages in the session and retrieve them later. This is useful for displaying messages to the user after a redirect.
const expressSession=require('express-session');

const ownersRouter=require('./routes/ownersRouter');
const userRouter=require('./routes/userRouter');
const productRouter=require('./routes/productRouter');
const indexRouter=require('./routes/index');

require('dotenv').config();

const db=require('./config/mongoose-connection');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(             
    expressSession({  // express-session is a package that allows you to store session data in the server. This is useful for storing user data across multiple requests.
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash());

app.use('/',indexRouter);
app.use('/owners',ownersRouter);
app.use('/users',userRouter);
app.use('/products',productRouter);


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});