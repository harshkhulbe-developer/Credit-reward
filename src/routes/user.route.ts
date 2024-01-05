import {Router} from "express";
import { UserController } from "../controllers/user.controller";
import {Authentication} from "../middlewares/authentication.middleware";
const userRouter = Router();
//To create the user
userRouter.post("/signup",UserController.createUser);
//For user login
userRouter.post("/login",UserController.loginUser);
//Update the user
userRouter.put("/:id",Authentication.authenticate,UserController.updateUser);
//To get all the user
userRouter.get("/",UserController.getAllUsers);
//To get a particular user
userRouter.get("/:id",UserController.getAParticularUser);
//Delete the user
userRouter.delete("/:id",Authentication.authenticate,UserController.deleteUser);
//Reset password
userRouter.patch("/reset-password",Authentication.authenticate,UserController.resetPassword);
//Verify otp
userRouter.post("/verify-otp",Authentication.authenticate,UserController.verifyOtp);

// userRouter.get("/",UserController.handleGetUser);
export default userRouter;