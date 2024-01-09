import * as express from "express";
import * as multer from "multer";
const imageRouter = express.Router();
import { Authentication } from "../middlewares/authentication.middleware";
import {imageUploadController} from "../controllers/imageUpload.controller"

const storage = multer.memoryStorage();
const upload = multer({storage});
imageRouter.post("/upload/:id",Authentication.authenticate,upload.single("image"),imageUploadController.uploadImage);

export default  imageRouter;