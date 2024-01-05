import { Request, Response } from "express";
export declare class UserController {
    static createUser(req: Request, res: Response): Promise<any>;
    static loginUser(req: Request, res: Response): Promise<any>;
    static updateUser(req: Request, res: Response): Promise<any>;
    static getAllUsers(req: Request, res: Response): Promise<void>;
    static getAParticularUser(req: Request, res: Response): Promise<any>;
    static deleteUser(req: Request, res: Response): Promise<void>;
    static resetPassword(req: Request, res: Response): Promise<any>;
}
