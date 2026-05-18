import express, {} from "express";
import { pool } from "./db";
import { userRouter } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import fs from "fs";
import { error } from "console";
import logger from "./middleware/logger";
import CookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app = express();
app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
const corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
    // res.send("Hello World!");
    res.status(200).json({
        message: "Express Server",
        author: "Next Level",
    });
});
app.use("/api/users", userRouter);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map