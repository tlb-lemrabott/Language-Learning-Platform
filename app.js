const express = require('express');
require('dotenv').config();
require('./connection/db-connection');
const app = express();

app.use(express.json());



//app.use('/');


app.listen(process.env.PORT, function(){
    const port = process.env.PORT
    console.log(process.env.SERVER_INFORMATION+port);
});