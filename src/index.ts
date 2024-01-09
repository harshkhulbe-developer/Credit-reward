const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db");
import userRouter from "./routes/user.route";
import cardRouter from "./routes/card.route";
import imageRouter from "./routes/imageUpload.route";
dotenv.config();
const app = express();
db();
app.use(express.json());
app.use("/users",userRouter);
app.use("/cards",cardRouter);
app.use("/image",imageRouter);
app.listen(process.env.PORT,() => {
    console.log(`Server started at PORT ${process.env.PORT}`);
});