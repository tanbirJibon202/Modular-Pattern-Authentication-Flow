import type { IUser } from "./user.interface";
export declare const userService: {
    createUserIntoDB: (payLoad: IUser) => Promise<import("pg").QueryResult<any>>;
    getAllUsersFromDB: () => Promise<import("pg").QueryResult<any>>;
    getSingleUserFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateUserFromDB: (payLoad: IUser, id: string) => Promise<import("pg").QueryResult<any>>;
    deleteUserFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=user.service.d.ts.map