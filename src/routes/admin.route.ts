import * as express from "express";
import { AdminController } from "../controllers/admin.controller";
import { Authentication } from "../middlewares/authentication.middleware";
const adminRouter = express.Router();

adminRouter.post("/login",AdminController.adminLogin);
adminRouter.get("/",Authentication.authenticate,AdminController.getAllUser);

export default adminRouter;