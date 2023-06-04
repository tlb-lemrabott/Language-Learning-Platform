const express = require('express');
require('dotenv').config();
require('./data_source/db-connection');
const routes = require('./routes/languageRouter');
const app = express();

app.use(express.json());



app.use('/api', routes);


app.listen(process.env.PORT, function(){
    const port = process.env.PORT
    console.log(process.env.SERVER_INFORMATION+port);
});