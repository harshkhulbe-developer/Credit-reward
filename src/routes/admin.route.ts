import * as express from "express";
import { AdminController } from "../controllers/admin.controller";
import { BankController } from "../controllers/bank.controller";
import { Authentication } from "../middlewares/authentication.middleware";
const adminRouter = express.Router();
//Admin routes
adminRouter.post("/login",AdminController.adminLogin);
adminRouter.get("/",Authentication.authenticate,AdminController.getAllUser);
adminRouter.get("/cards",Authentication.authenticate,AdminController.getAllCard);
adminRouter.get("/user/search",Authentication.authenticate,AdminController.searchUser);
//Bank routes
adminRouter.post("/add-bank",Authentication.authenticate,BankController.addBank);
adminRouter.get("/get-all-bank",Authentication.authenticate,BankController.getAllTheBank);
adminRouter.post("/add-card",Authentication.authenticate,BankController.addCard);
adminRouter.get("/get-bank-card/:id",Authentication.authenticate,BankController.getBankCard);
export default adminRouter;