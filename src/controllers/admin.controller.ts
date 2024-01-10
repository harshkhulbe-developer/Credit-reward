import {Request,Response} from "express";
import Admin from "../models/admin.model"
import Auth from "../auth/auth";
// import {User} from "../models/user.model"
const User = require("../models/user.model");
import * as jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 
export class AdminController {


    static async createAdmin() {
        try {
            const encryptedPassword = await Auth.hashPassword('Admin@123');

            const isAdminExist = await Admin.exists({ email: 'harsh@gmail.com' });
            if (isAdminExist) {
                console.log('Admin Exists');
            }
            else {
                await Admin.create({
                    name: 'Harsh Khulbe',
                    email: 'harsh@gmail.com',
                    password: encryptedPassword,
                });

                console.log('Admin created');
            }

        } catch (error) {
            console.log('error', error);
        }
    }





    static async adminLogin(req:Request,res:Response) {
        const {email,password} = req.body;
        const admin = await Admin.findOne({email});
        if(!admin) {
            return res.json({
                message:"Admin not found",
            })
        }

        const match = await Auth.comparePassword(password,admin.password);

        if (match) {
            const adminToken = jwt.sign({_id:admin._id,email},JWT_SECRET_KEY,{expiresIn:"30d"});
            return res.json({
                message: "Admin login successful",
                token:adminToken,
            });
        } else {
            return res.json({
                message: "Incorrect password",
            });
        }
    }



    static async getAllUser(req:Request,res:Response) {
        const users = await User.find();
        if(!users) {
            return res.json({
                message:"Some error while finding the user",
            })
        }

        return res.json({
            message:"Successfully got all the users",
            users,
        })
    }




    static async searchUser(req:Request,res:Response) {
        try {
            const {name} = req.query;
            const user = await User.find({firstName:{$regex:name,$options:"i"}});
            if(!user) {
                return res.json({
                    message:"User not exists",
                })
            }

            return res.json({
                message:"User found successfully",
                userInfo:user,
            })

        } catch (error) {
            console.log(error);
        }
    }
}

