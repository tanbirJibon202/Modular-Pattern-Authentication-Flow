import { pool } from "../../db";
import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";
const createUser = async (req, res) => {
    // const { name, email, age, password } = req.body;
    try {
        const result = await userService.createUserIntoDB(req.body);
        // console.log(result);
        res.status(201).json({
            success: true,
            message: "User Created successfully!",
            data: result.rows[0],
        });
    }
    catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const getAllUsers = async (req, res) => {
    console.log("Controller", req.user);
    try {
        const result = await userService.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully!",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const getSingleUser = async (req, res) => {
    // const id = req.params.id;
    //  console.log(req.params);
    const { id } = req.params;
    // console.log(id);
    try {
        const result = await userService.getSingleUserFromDB(id);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User Not found",
                data: {},
            });
        }
        // console.log(result);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User retrieved successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const updateUser = async (req, res) => {
    const { id } = req.params;
    // console.log("Id : ", id);
    // console.log({ name, age, password, is_active });
    try {
        const result = await userService.updateUserFromDB(req.body, id);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User Not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUserFromDB(id);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User Not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map