"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const userRouter = (0, express_1.Router)();
//To create the user
userRouter.post("/signup", user_controller_1.UserController.createUser);
//For user login
userRouter.post("/login", user_controller_1.UserController.loginUser);
//Update the user
userRouter.put("/:id", authentication_middleware_1.Authentication.authenticate, user_controller_1.UserController.updateUser);
//To get all the user
userRouter.get("/", user_controller_1.UserController.getAllUsers);
//To get a particular user
userRouter.get("/:id", user_controller_1.UserController.getAParticularUser);
//Delete the user
userRouter.delete("/:id", authentication_middleware_1.Authentication.authenticate, user_controller_1.UserController.deleteUser);
//Reset password
userRouter.patch("/resetPassword", authentication_middleware_1.Authentication.authenticate, user_controller_1.UserController.resetPassword);
// userRouter.get("/",UserController.handleGetUser);
exports.default = userRouter;
