import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payLoad: IUser) => {
  const { name, email, age, role, password } = payLoad;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
  INSERT INTO users(name, email, age, role, password)
  VALUES($1, $2, $3, COALESCE($4, 'user'), $5)
  RETURNING id, name, email, age, role, is_active, created_at
  `,
    [name, email, age, role, hashPassword],
  );
  delete result.rows[0].password;
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await pool.query(`
  SELECT id, name, email, age, role, is_active, created_at
  FROM users
`);
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
  SELECT id, name, email, age, role, is_active, created_at
  FROM users
  WHERE id = $1
  `,
    [id],
  );
  return result;
};

const updateUserFromDB = async (payLoad: IUser, id: string) => {
  const { name, age, password, is_active } = payLoad;

  let hashedPassword = null;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const result = await pool.query(
    `
    UPDATE users 
    SET 
      name = COALESCE($1, name), 
      age = COALESCE($2, age), 
      password = COALESCE($3, password), 
      is_active = COALESCE($4, is_active), 
      updated_at = NOW()
    WHERE id = $5 
   RETURNING id, name, email, age, role, is_active, updated_at
    `,
    [name, age, hashedPassword, is_active, id],
  );

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM users
      WHERE id = $1 
      RETURNING id, name, email, age, role
      `,
    [id],
  );
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
