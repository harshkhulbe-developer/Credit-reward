"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db");
const user_route_1 = require("./routes/user.route");
dotenv.config();
const app = express();
db();
app.use(express.json());
app.use("/", user_route_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT ${process.env.PORT}`);
});
