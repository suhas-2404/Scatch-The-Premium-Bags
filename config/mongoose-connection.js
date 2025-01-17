const mongoose = require('mongoose');

mongoose
.connect('mongodb+srv://suhasrajeshmysore:Chinnu2004@rock.uopia.mongodb.net/scatch')
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

module.exports = mongoose.connection;