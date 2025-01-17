const mongoose = require('mongoose');
const debug = require('debug')('app:mongoose-connection'); // debug is a package that allows you to log messages to the console only when a certain condition is met. In this case, the condition is that the environment variable DEBUG is set to 'app:mongoose-connection'. This is useful because you can turn on and off debugging messages by setting the DEBUG environment variable.
const config = require('config');

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(() => {
    debug('Connected to MongoDB');
}).catch((err) => {
    debug('Error connecting to MongoDB', err);
});

module.exports = mongoose.connection;