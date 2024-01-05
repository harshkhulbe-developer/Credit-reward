import * as jwt from "jsonwebtoken";

export class Authentication {
    static async authenticate(req:any,res:any,next) {

        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.json({
                message:"Please provide the token to validate the user",
            })
        }

        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,userDetails) => {
            if(err) {
                return res.json({
                    message:"User is not authorized",
                    error:err,
                })
            }

            req.user = userDetails;
            next();
        })
    }
}