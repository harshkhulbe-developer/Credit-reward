import * as mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    phoneNo:{
        type:Number,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    otp:{
        type:String,
    },
    address:{
        type:String,
    },
    dob:{
        type:Date,
    },
    ssn:{
        type:Number,
    },
    income:{
        type:Number,
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = User;