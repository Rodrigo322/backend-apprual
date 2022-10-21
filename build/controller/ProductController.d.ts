import { Request, Response } from "express";
export declare class ProductController {
    index(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    store(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    deleteMany(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
