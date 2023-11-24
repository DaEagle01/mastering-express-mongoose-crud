"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
exports.OrderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1, { message: 'Product name is required.' }),
    price: zod_1.z.number().positive({ message: 'Product price must be positive.' }),
    quantity: zod_1.z
        .number()
        .int()
        .positive({ message: 'Product quantity must be a positive integer.' }),
});
exports.UserValidationSchema = zod_1.z.object({
    userId: zod_1.z
        .number()
        .int()
        .positive({ message: 'UserId must be a positive integer.' }),
    username: zod_1.z.string().min(5, {
        message: 'Username is required and must be at least 5 characters long.',
    }),
    password: zod_1.z.string().min(6, {
        message: 'Password is required and must be at least 6 characters long.',
    }),
    fullName: zod_1.z
        .object({
        firstName: zod_1.z.string().min(1, { message: 'First name is required.' }),
        lastName: zod_1.z.string().min(1, { message: 'Last name is required.' }),
    })
        .refine((data) => data.firstName && data.lastName, {
        message: 'Full name is required.',
    }),
    age: zod_1.z
        .number()
        .int()
        .positive({ message: 'Age must be a positive integer.' }),
    email: zod_1.z
        .string()
        .email({ message: 'This email is not valid.' })
        .min(5, { message: 'Email is required.' }),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z
        .array(zod_1.z.string())
        .refine((data) => data.length > 0, { message: 'Hobbies are required.' }),
    address: zod_1.z
        .object({
        street: zod_1.z.string().min(1, { message: 'Street name is required.' }),
        city: zod_1.z.string().min(1, { message: 'City name is required.' }),
        country: zod_1.z.string().min(1, { message: 'Country name is required.' }),
    })
        .refine((data) => data.street && data.city && data.country, {
        message: 'Address is required.',
    }),
    orders: zod_1.z.array(exports.OrderValidationSchema).default([]),
});
