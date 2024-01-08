import {Request,Response} from "express";
import * as mongoose from "mongoose";
const Card = require("../models/card.model");
const User = require("../models/user.model");

export class CardController {
    static async createCard(req:Request,res:Response) {
        const {cardName,cardNumber,cardHolderName,expiresIn,cvv,userId} = req.body;
        if(!cardName || !cardNumber || !cardHolderName || !expiresIn || !cvv || !userId) {
            return res.json({
                message:"Please fill the required card details",
            })
        }

        const user = await User.findOne({_id:userId});
        if(!user) {
            return res.json({
                message:"User not found",
            })
        }
        const card = await Card.create({
            cardName,
            cardNumber,
            cardHolderName,
            expiresIn,
            cvv,
            userId,
        })

        return res.status(201).json({
            message:"Card for particular user is created successfully",
            cardInfo:card,
        });

    }


    static async getAllCards(req:Request,res:Response) {
        const cards = await Card.find();
        if(!cards) {
            return res.json({
                message:"No cards exists",
            })
        }

        return res.status(200).json({
            message:"Successfully got all the cards",
            cards,
        })
    }

    static async getCardByID(req:Request,res:Response) {
        const id = req.params.id;
        const objId = new mongoose.Types.ObjectId(id);
        const card = await Card.aggregate([
            {
                $match:{
                    _id:objId,
                }
            }
        ]);

        if(!card) {
            return res.json("Card doesn't exists");
        }

        return res.json({
            message:"Successfully got the card",
            card,
        });
    }



    static async updateCard(req:Request,res:Response) {
        const id = req.params.id;
        const {cardName,cardNumber,cardHolderName,expiresIn,cvv,userId} = req.body;
        const updatedCard = await Card.findByIdAndUpdate(id,{cardName,cardNumber,cardHolderName,expiresIn,cvv,userId},{new:true});
        if(!updatedCard) {
            return res.json({
                message:"Sorry,there is some error while updating the card",
            })
        }

        return res.json({
            message:"Card updated successfully",
            updatedCard,
        })
    }


    static async deleteCard(req:Request,res:Response) {
        const id = req.params.id;
        const deletedCard = await Card.findByIdAndDelete(id);

        if(!deletedCard) {
            return res.json({
                message:"Sorry,there is some error while deleting the card",
            })
        }

        return res.json({
            message:"Card deleted successfully",
            deletedCard,
        })
    }
}
