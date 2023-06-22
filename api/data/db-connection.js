const mongoose = require("mongoose");
require('./models/language');
require('./models/user')


mongoose.connect(process.env.DB_URL)
    .then(() => console.log(process.env.CONNECTION_MSG_INFO + process.env.DB_NAME))
    .catch((err) => console.log(process.env.CNX_ERROR_MSG, err));