import express, {} from "express";
import { pool } from "./db";
import { userRouter } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
const app = express();
app.use(express.json());
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
export default app;
//# sourceMappingURL=app.js.map