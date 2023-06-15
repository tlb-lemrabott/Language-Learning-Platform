const express = require('express');
require('dotenv').config();
require('./data_source/db-connection');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use("/api", function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
//     next();
// });

// app.use(cors({
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));


app.use('/api', routes);


app.listen(process.env.PORT, function(){
    const port = process.env.PORT
    console.log(process.env.MSG_SERVER_START+port);
});