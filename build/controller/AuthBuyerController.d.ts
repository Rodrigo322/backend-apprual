import { Request, Response } from "express";
export declare class AuthBuyerController {
    authenticate(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
