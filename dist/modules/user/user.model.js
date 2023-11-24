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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required.'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        unique: true,
        required: [true, 'UserId is required.'],
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'User name is required.'],
    },
    password: {
        type: String,
        required: [true, 'User name is required.'],
    },
    fullName: {
        type: {
            firstName: {
                type: String,
                required: [true, 'First name is required.'],
            },
            lastName: {
                type: String,
                required: [true, 'Last name is required.'],
            },
        },
        required: [true, 'Full name is required.'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required.'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.'],
    },
    isActive: {
        type: Boolean,
        default: true,
        required: [true, 'Activity status is required.'],
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required.'],
    },
    address: {
        type: {
            street: {
                type: String,
                required: [true, 'Street name is required.'],
            },
            city: {
                type: String,
                required: [true, 'City name is required.'],
            },
            country: {
                type: String,
                required: [true, 'Country name is required.'],
            },
        },
        required: [true, 'Address is required.'],
    },
    orders: {
        type: [orderSchema],
        default: [],
    },
});
userSchema.statics.getUserByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.User.findOne({ userId }, { password: 0 });
    return user;
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // here this refers to the document
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcryptSaltRounds));
        next();
    });
});
userSchema.post('save', function (user, next) {
    user.password = '';
    next();
});
exports.User = (0, mongoose_1.model)('User', userSchema);
