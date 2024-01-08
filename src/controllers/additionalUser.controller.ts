import {Request,Response} from "express";
const  User = require("../models/user.model");

export class AdditionalUserController {
    static async addAddress(req:Request,res:Response) {
        try {
            const userId = req.params.id;
            const {address} = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId,{address},{ new: true });
            
            return res.status(200).json({
                message:"User updated successfully",
                updatedData:updatedUser,
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async addDateOfBirth(req:Request,res:Response) {
        try {
            const userId = req.params.id;
            const {dob} = req.body;
            const userData = await User.findByIdAndUpdate(userId,{dob},{new:true});
            return res.status(200).json({
                message:"DOB added successfully",
                updatedData:userData,
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async addSsn(req:Request,res:Response) {
        try {
            const userId = req.params.id;
            const {ssn} = req.body;
            const userData = await User.findByIdAndUpdate(userId,{ssn},{new:true});
            return res.status(200).json({
                message:"SSN added successfully",
                updatedData:userData,
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async addIncome(req:Request,res:Response) {
        try {
            const userId = req.params.id;
            const {income} = req.body;
            const userData = await User.findByIdAndUpdate(userId,{income},{new:true});
            return res.status(200).json({
                message:"Income added successfully",
                updatedData:userData,
            })
        } catch (error) {
            console.log(error);
        }
    }

}