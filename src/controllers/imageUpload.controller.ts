import {Request,Response} from "express";
const User = require("../models/user.model")

export class imageUploadController {
    static async uploadImage(req:Request,res:Response) {
        try {
            console.log("Req.file info: ",req.file);
            const userId = req.params.id;
            const user = await User.findOne({_id:userId});
            // const updateUserByUploadingImage = await User.findByIdAndUpdate(userId,{imagePath:req.file.imagePath},{new:true});
            // const fileBuffer = req.file.buffer;
            // const image = new User({imagePath:"../uploads/image.png"});
            // const result = await image.save();
            user.imagePath = req.file.originalname;
            await user.save();
            res.status(201).json({
                message:"Image saved successfully",
                user,
            })
        } catch (error) {
            res.json({
                message:"Error while uploading the image",
                error,
            })
        }
    }
}