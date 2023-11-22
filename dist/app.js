"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const userRoutes = express_1.default.Router();
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Here we master CRUD operations using express and mongodb.',
    });
});
exports.default = app;
