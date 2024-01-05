const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
function connectDb(){ 
    mongoose.connect(process.env.Mongourl)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err:any) => {
        console.log("DB error: ",err);
    })
}
module.exports = connectDb;