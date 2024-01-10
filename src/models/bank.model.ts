import * as mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    name:{
        type:String,
    }
})

const Bank = mongoose.model("Bank",bankSchema);

export default Bank;