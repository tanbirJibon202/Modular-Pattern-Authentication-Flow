import { pool } from "../../db";
import bcrypt from "bcrypt";
const createUserIntoDB = async (payLoad) => {
    const { name, email, age, password } = payLoad;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
    INSERT INTO users(name, email, age, password) VALUES($1, $2, $3, $4) RETURNING * 
    `, [name, email, age, hashPassword]);
    delete result.rows[0].password;
    return result;
};
const getAllUsersFromDB = async () => {
    const result = await pool.query(`
         SELECT * FROM users
      `);
    return result;
};
const getSingleUserFromDB = async (id) => {
    const result = await pool.query(`
        SELECT * FROM users
        WHERE id = $1
        `, [id]);
    return result;
};
const updateUserFromDB = async (payLoad, id) => {
    const { name, age, password, is_active } = payLoad;
    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }
    const result = await pool.query(`
    UPDATE users 
    SET 
      name = COALESCE($1, name), 
      age = COALESCE($2, age), 
      password = COALESCE($3, password), 
      is_active = COALESCE($4, is_active), 
      updated_at = NOW()
    WHERE id = $5 
    RETURNING *
    `, [name, age, hashedPassword, is_active, id]);
    return result;
};
const deleteUserFromDB = async (id) => {
    const result = await pool.query(`
      DELETE FROM users
      WHERE id = $1 
      RETURNING *
      `, [id]);
    return result;
    // console.log(result);
};
export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
};
//# sourceMappingURL=user.service.js.map