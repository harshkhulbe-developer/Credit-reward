const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db");
import userRouter from "./routes/user.route"
dotenv.config();
const app = express();
db();
app.use(express.json());
app.use("/",userRouter);
app.listen(process.env.PORT,() => {
    console.log(`Server started at PORT ${process.env.PORT}`);
});