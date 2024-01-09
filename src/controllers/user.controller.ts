import {Request,Response} from "express";
const User = require("../models/user.model");
import * as mongoose from "mongoose";
import Auth from '../auth/auth';
import * as jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 
const Card = require("../models/card.model");

export class UserController {
     static async createUser(req:Request,res:Response) {
        try {
            const {firstName,lastName,phoneNo,email,password} = req.body;
            if(!firstName || !lastName || !phoneNo || !email || !password) {
                return res.status(400).json("Please fill all the required fields");
            }
            const hashedPassword:string = await Auth.hashPassword(password);

            const userExists = await User.findOne({email});
            if(userExists) {
                return res.status(409).json({
                    message:"user already exists",
                })
            }
            const user = await User.create({
                firstName,
                lastName,
                phoneNo,
                email,
                password:hashedPassword,
                otp:await Auth.generateOtp()
            });
            return res.status(201).json({
                message:"User successfully created",
                data:user,
            })
        } catch (error) {
            console.log(error);
            return res.status(422).json({
                message:"User Registration failed",
                err:error,
            })
        }
    }

    




    static async loginUser(req:Request,res:Response) {
        try {
            const {email,password} = req.body;
            const user = await User.findOne({email});

            if(!user) {
                return res.status(404).json({
                    message:"User doesn't exists",
                })
            }

            const match = await Auth.comparePassword(password,user.password);
            console.log("Password matches? ",match);

            if(match) {
                // return res.status(200).json({
                //     message:"User is logged in",
                // })
                const token = jwt.sign({_id:user._id,email:user.email},JWT_SECRET_KEY,{expiresIn:"30d"});
                return res.status(200).json({
                    message:"Sucessfully logged in",
                    token,
                })
            } else {
                return res.status(401).json({
                    message:"Wrong Password"
                })
            }

        } catch (error) {
            console.log(error);
        }
    }






    static async updateUser(req:Request,res:Response) {
        try {
            const userId = req.params.id;
            const {firstName,lastName,phoneNo,email} = req.body;

            const updatedUser = await User.findByIdAndUpdate(userId,{$set:{
                firstName,lastName,phoneNo,email,
            }},{new:true});

            return res.status(200).json({
                message:"User updated successfully",
                data:updatedUser,
            });
        } catch (error) {
            console.log(error);
        }
    }







    static async getAllUsers(req:Request,res:Response){
        try {
            const users = await User.find({});
            return res.status(200).json({
                message:"Successfully got all the users",
                data:users,
            })
        } catch (error) {
            console.log(error);
        }
    }







    static async getAParticularUser(req:Request,res:Response) {
        try {
            const userId = req.params.id;
            const user = await User.findById({_id:userId});
            if(!user) {
                return res.status(404).json({
                    message:"User doesn't exists",
                })
            }

            return res.json({
                message:"Got the user data",
                data:user,
            })

        } catch (error) {
            console.log(error);
        }
    }







    static async deleteUser(req:Request,res:Response) {
        try {
            const userId = req.params.id;
            const userToBeDeleted = await User.findByIdAndDelete({_id:userId});
            return res.json({
                message:"User deleted successfully",
                userDeleted:userToBeDeleted,
            })
        } catch (error) {
            console.log(error);
        }
    }






    static async forgotPassword(req:Request,res:Response) {
        const {email,password,confirmPassword} = req.body;
        const user = await User.find({email});
        if(!user) {
            return res.status(404).json({
                message:"User doesn't exists",
            })
        }

        if(password !== confirmPassword) {
            return res.json({
                message:"Password and confirm password do not match",
            })
        }
        const hashedPassword = await Auth.hashPassword(password);
        const updatedData = await User.findOneAndUpdate({email},{
            $set:{
                password:hashedPassword,
            }
        })

        return res.json({
            message:"Password reset successfully",
            data:updatedData,
        })
    }






    static async verifyOtp(req:Request,res:Response) {
        const id = req.user._id;
        const {otp} = req.body;
        const user = await User.findOne({_id:id});
        
        if(!user) {
            res.status(400).json({
                message:"User not found",
            })
        }
        if(user.otp === otp) {
            return res.json({
                message:"Otp verified successfully",
            })
        } else {
            return res.json({
                message:"Otp doesn't match",
            })
        }
       
    }






    static async accessProfile(req:Request,res:Response) {
        try {
            const userId = req.user.id;
            const {password} = req.body;

            if(!password) {
                return res.json({
                    message:"Please enter the password",
                })
            }

            const user = User.findOne({userId});
            if(!user) {
                return res.json({
                    message:"User not found",
                })
            }
            const match = Auth.comparePassword(password,user.password);
            if(!match) {
                return res.json({
                    message:"Password didn't match",
                })
            }
            return res.json({
                message:"Congrats,now user can access his/her profile",
            })
            } catch (error) {
                console.log(error);
            }
    }





    static async getAllCardsForUser(req:Request,res:Response) {
        const userId = req.params.id;
        const user = await User.findOne({_id:userId});
        if(!user) {
            return res.json({
                message:"User not found",
            })
        }

        const cards = await Card.find({userId});

        if(!cards) {
            return res.json({
                message:"No cards found",
            })
        }

        return res.json({
            message:"Successfully got all the cards of a particular user",
            cards,
            user
        })
    }
}