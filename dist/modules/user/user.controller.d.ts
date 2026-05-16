import type { Request, Response } from "express";
export declare const userController: {
    createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    getSingleUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=user.controller.d.ts.map