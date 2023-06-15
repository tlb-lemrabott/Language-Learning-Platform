const mongoose = require("mongoose");
require('./models/language');


mongoose.connect(process.env.DB_URL)
    .then(() => console.log(process.env.CONNECTION_MSG_INFO))
    .catch((err) => console.log(process.env.CNX_ERROR_MSG, err));