const mongoose = require("mongoose");
require('./models/language');
require('dotenv').config();

mongoose.connect(process.env.CONNEXION_URL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on(process.env.CONNECTED_EVENT, function(){
    console.log(process.env.CONNECTION_MSG_INFO, process.env.DB_NAME);
});

mongoose.connection.on(process.env.DISCONNECTED_EVENT, function(){
    console.log(process.env.DISCONNECTION_MSG_INFO, process.env.DB_NAME);
});

mongoose.connection.on(process.env.ERROR_EVENT, function(err){
    console.log(process.env.CNX_ERROR_MSG,err);
});