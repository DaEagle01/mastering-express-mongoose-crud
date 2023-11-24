"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_validation_1 = require("./user.validation");
const user_services_1 = require("./user.services");
const user_model_1 = require("./user.model");
const userNotFoundStatus = (res) => {
    return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
            code: 404,
            description: 'User not found!',
        },
    });
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userData } = req.body;
        const validatedData = user_validation_1.UserValidationSchema.parse(userData);
        const result = yield user_services_1.UserServices.createUserIntoDB(validatedData);
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not created successfully.',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.UserServices.getAllSUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User fetching was not successful.',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_services_1.UserServices.getSingleUserFromDB(userId);
        if (!result) {
            userNotFoundStatus(res);
        }
        else {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong.',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userData } = req.body;
        const { userId } = req.params;
        const validatedData = user_validation_1.UserValidationSchema.parse(userData);
        const user = yield user_model_1.User.getUserByUserId(userId);
        if (user) {
            const result = yield user_services_1.UserServices.updateUserFromDB(userId, validatedData);
            res.status(201).json({
                success: true,
                message: 'User updated successfully!',
                data: result,
            });
        }
        else {
            userNotFoundStatus(res);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not updated successfully.',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_model_1.User.getUserByUserId(userId);
        if (user) {
            yield user_services_1.UserServices.deleteUserFromDB(userId);
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
        else {
            userNotFoundStatus(res);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User deleting was not successful.',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { orderData } = req.body;
        const validatedData = user_validation_1.OrderValidationSchema.parse(orderData);
        const user = yield user_model_1.User.getUserByUserId(userId);
        if (user) {
            yield user_services_1.UserServices.addProductToOrder(userId, validatedData);
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
        else {
            userNotFoundStatus(res);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Order not placed successfully.',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const getAllOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_model_1.User.getUserByUserId(userId);
        if (user) {
            const result = yield user_services_1.UserServices.getAllOrdersByUser(userId);
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: result,
            });
        }
        else {
            userNotFoundStatus(res);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Order fetching was not successful.',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const getTotalOrderPriceByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_model_1.User.getUserByUserId(userId);
        if (user) {
            const result = yield user_services_1.UserServices.getTotalOrderPriceByUser(userId);
            console.log(result);
            res.status(200).json({
                success: true,
                message: result
                    ? 'Total price calculated successfully!'
                    : 'No orders placed yet.',
                data: result,
            });
        }
        else {
            userNotFoundStatus(res);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Total price calculation was not successful.',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addProductToOrder,
    getAllOrdersByUser,
    getTotalOrderPriceByUser,
};
