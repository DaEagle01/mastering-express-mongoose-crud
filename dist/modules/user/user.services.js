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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllSUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.getUserByUserId(userId);
    return result;
});
const updateUserFromDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, userData, {
        projection: { password: 0 },
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndDelete({ userId });
    return result;
});
const addProductToOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, {
        $push: { orders: orderData },
    });
    return result;
});
const getAllOrdersByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId }, { _id: 0, orders: 1 });
    return result;
});
const getTotalOrderPriceByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        {
            $match: {
                userId: Number(userId),
            },
        },
        {
            $unwind: '$orders',
        },
        {
            $group: {
                _id: '$_id',
                totalPrice: {
                    $sum: {
                        $multiply: ['$orders.price', '$orders.quantity'],
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1,
            },
        },
    ]);
    return result[0];
});
exports.UserServices = {
    createUserIntoDB,
    getAllSUserFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
    addProductToOrder,
    getAllOrdersByUser,
    getTotalOrderPriceByUser,
};
