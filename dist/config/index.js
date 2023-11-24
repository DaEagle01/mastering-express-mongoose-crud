"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), '.env'),
});
exports.default = {
    port: process.env.PORT,
    databaseUrlLocal: process.env.DATABASE_URL_LOCAL,
    databaseUrl: process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
};
