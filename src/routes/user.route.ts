import {Router} from "express";
import { UserController } from "../controllers/user.controller";
import {AdditionalUserController} from "../controllers/additionalUser.controller";
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
//Forgot password
userRouter.patch("/forgot-password",Authentication.authenticate,UserController.forgotPassword);
//Verify otp
userRouter.post("/verify-otp",Authentication.authenticate,UserController.verifyOtp);
//Access profile 
userRouter.post("/access-profile",Authentication.authenticate,UserController.accessProfile);
//Add address of the user
userRouter.put("/add-address/:id",Authentication.authenticate,AdditionalUserController.addAddress);
//Add dob
userRouter.put("/add-dob/:id",Authentication.authenticate,AdditionalUserController.addDateOfBirth);
//Add SSN
userRouter.put("/add-ssn/:id",Authentication.authenticate,AdditionalUserController.addSsn);
//Add Income of the user
userRouter.put("/add-income/:id",Authentication.authenticate,AdditionalUserController.addIncome);
//Get all the cards of a particular user
userRouter.get("/:id/cards",Authentication.authenticate,UserController.getAllCardsForUser);
export default userRouter;