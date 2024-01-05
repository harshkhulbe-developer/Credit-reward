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
exports.UserController = void 0;
const User = require("../models/user.model");
const auth_1 = require("../auth/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
console.log(JWT_SECRET_KEY);
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, phoneNo, email, password } = req.body;
                if (!firstName || !lastName || !phoneNo || !email || !password) {
                    return res.status(400).json("Please fill all the required fields");
                }
                const hashedPassword = yield auth_1.default.hashPassword(password);
                const userExists = yield User.findOne({ email });
                if (userExists) {
                    return res.status(409).json({
                        message: "user already exists",
                    });
                }
                const user = yield User.create({ firstName, lastName, phoneNo, email, password: hashedPassword });
                return res.status(201).json({
                    message: "User successfully created",
                    data: user,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(422).json({
                    message: "User Registration failed",
                    err: error,
                });
            }
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User.findOne({ email });
                if (!user) {
                    return res.status(404).json({
                        message: "User doesn't exists",
                    });
                }
                const match = yield auth_1.default.comparePassword(password, user.password);
                console.log("Password matches? ", match);
                if (match) {
                    // return res.status(200).json({
                    //     message:"User is logged in",
                    // })
                    const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: "30d" });
                    return res.json({
                        message: "Sucessfully logged in",
                        token,
                    });
                }
                else {
                    return res.status(401).json({
                        message: "Wrong Password"
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const { firstName, lastName, phoneNo, email } = req.body;
                const updatedUser = yield User.findByIdAndUpdate(userId, { $set: {
                        firstName, lastName, phoneNo, email,
                    } }, { new: true });
                return res.status(200).json({
                    message: "User updated successfully",
                    data: updatedUser,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.find({});
                res.status(200).json({
                    message: "Successfully got all the users",
                    data: users,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getAParticularUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield User.findById({ _id: userId });
                if (!user) {
                    return res.status(404).json({
                        message: "User doesn't exists",
                    });
                }
                return res.json({
                    message: "Got the user data",
                    data: user,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const userToBeDeleted = yield User.findByIdAndDelete({ _id: userId });
                res.json({
                    message: "User deleted successfully",
                    userDeleted: userToBeDeleted,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, confirmPassword } = req.body;
            const user = yield User.find({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User doesn't exists",
                });
            }
            if (password !== confirmPassword) {
                return res.json({
                    message: "Password and confirm password do not match",
                });
            }
            const hashedPassword = yield auth_1.default.hashPassword(password);
            const updatedData = yield User.findOneAndUpdate({ email }, {
                $set: {
                    password: hashedPassword,
                }
            });
            return res.json({
                message: "Password reset successfully",
                data: updatedData,
            });
        });
    }
}
exports.UserController = UserController;
