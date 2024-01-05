"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const jwt = require("jsonwebtoken");
class Authentication {
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.json({
                    message: "Please provide the token to validate the user",
                });
            }
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userDetails) => {
                if (err) {
                    return res.json({
                        message: "User is not authorized",
                        error: err,
                    });
                }
                req.user = userDetails;
                next();
            });
        });
    }
}
exports.Authentication = Authentication;
