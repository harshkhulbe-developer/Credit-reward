import * as mongoose from "mongoose";
import * as users from "./user.model";

const cardSchema = new mongoose.Schema({
    cardName:{
        type:String,
    },
    cardNumber:{
        type:Number,
    },
    cardHolderName:{
        type:String,
    },
    expiresIn:{
        type:Date,
    },
    cvv:{
        type:Number,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:users,
    }
});

const Card = mongoose.model("card",cardSchema);

module.exports = Card;