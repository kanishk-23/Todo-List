const mongoose = require('mongoose');
function DBconnection(){
    const DB_URL = process.env.MONGO_URI;
    // const DB_USER_URL = process.env.MONGO_USER_URI;
    mongoose.connect(DB_URL)
    const db = mongoose.connection;
    db.on("error", console.error.bind());
    db.once("open", function(){console.log("DB Connected")});
}

module.exports = DBconnection;