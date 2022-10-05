import { Request, Response } from "express";
export declare class ProducerController {
    index(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    store(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
