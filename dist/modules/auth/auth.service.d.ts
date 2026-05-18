export declare const authService: {
    loginUserIntoDB: (payLoad: {
        email: string;
        password: string;
    }) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateFreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map