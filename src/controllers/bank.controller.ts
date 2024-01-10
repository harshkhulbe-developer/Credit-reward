import {Request,Response} from "express";
import Bank from "../models/bank.model"; 
const Card = require("../models/card.model");

export class BankController {
    static async addBank(req:Request,res:Response) {
        try {
            const {name} = req.body;
            if(!name) {
                req.json({
                    message:"Please enter the name",
                })
            }
            const bankExists = await Bank.findOne({name});
            if(bankExists) {
                return res.json({
                    message:"Bank already exists",
                })
            }
            const bank = await Bank.create({
                name,
            })
            return res.json({
                message:"Bank created successfully",
                bank,
            })
        } catch (error) {
            console.log(error);
        }
    }



    static async getAllTheBank(req:Request,res:Response) {
        const banks = await Bank.find();
        if(banks.length === 0) {
            return res.json({
                message:"No bank exists",
            })
        }

        return res.json({
            message:"Successfully got all the banks",
            banks,
        });
    }


    static async addCard(req:Request,res:Response) {
        const {
            cardName,
            bankSpendingRequirement,
            welcomeBonus,
            creditCardProcessingFee,
            membershipFee,
            giftToYou,
            link,
            additionalInformation,
        } = req.body;

        if(!cardName || !bankSpendingRequirement || !welcomeBonus || !creditCardProcessingFee ||
        !membershipFee || !giftToYou || !link || !additionalInformation) {
            return res.json({
                message:"Please enter all the fields",
            })
        }

        const card = await Card.create({
            cardName,
            bankSpendingRequirement,
            welcomeBonus,
            creditCardProcessingFee,
            membershipFee,
            giftToYou,
            link,
            additionalInformation,
        });

        return res.json({
            message:"Successfully created a card",
            card,
        })
    }


    static async getBankCard(req: Request, res: Response) {
        try {

            let id =req.params.id
            const objid = new mongoose.Types.ObjectId(id)
            // console.log(typeof(objid))
            // const userId=req.userData._id;
            const user = await Bank.aggregate([
              {
                $match: {  
                  _id: objid
                }
              },
              {
                $lookup:{
                  from:"bcards",
                  localField:"_id",
                  foreignField:"bankId",
                  as:"bankCard"
      
                }
              },
             
            ])
            console.log(user)
            return res.status(200).json(user);
          } catch (error) {
            return res.status(500).json({ error: error.message });
          }

    }
}