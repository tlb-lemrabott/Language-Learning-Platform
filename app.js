const express = require('express');
require('dotenv').config();
require('./api/data/db-connection');
const routes = require('./api/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
    next();
});


app.use('/api', routes);


app.listen(process.env.PORT, function(){
    const port = process.env.PORT
    console.log(process.env.MSG_SERVER_START+port);
});