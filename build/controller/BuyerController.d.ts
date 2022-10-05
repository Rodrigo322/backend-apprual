import { Request, Response } from "express";
export declare class BuyerController {
    index(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    store(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
