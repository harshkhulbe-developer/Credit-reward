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
userRouter.get("/",Authentication.authenticate,UserController.getAllUsers);
//To get a particular user
userRouter.get("/:id",UserController.getAParticularUser);
//Delete the user
userRouter.delete("/:id",Authentication.authenticate,UserController.deleteUser);
//Reset password
userRouter.patch("/resetPassword",Authentication.authenticate,UserController.resetPassword);

// userRouter.get("/",UserController.handleGetUser);
export default userRouter;