import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/env";
const loginUserIntoDB = async (payLoad) => {
    const { email, password } = payLoad;
    //1. Check if the user exists
    // 2. Compare the password
    // 3. Generate Token
    const userData = await pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email]);
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credential!");
    }
    const user = userData.rows[0];
    // console.log(user);
    const matchPassword = await bcrypt.compare(password, user.password);
    // console.log(matchPassword);
    if (!matchPassword) {
        throw new Error("Invalid Credential!");
    }
    // Generate Token
    const jwtPayLoad = {
        email: user.email,
        id: user.id,
        name: user.name,
        is_active: user.is_active,
    };
    const accessToken = jwt.sign(jwtPayLoad, config.secret, {
        expiresIn: "1d",
    });
    return { accessToken };
};
export const authService = {
    loginUserIntoDB,
};
//# sourceMappingURL=auth.service.js.map