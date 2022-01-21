"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validateToken(req, res, next) {
    var _a, _b, _c;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.body) === null || _b === void 0 ? void 0 : _b.token) || ((_c = req.header("Authorization")) === null || _c === void 0 ? void 0 : _c.replace("Bearer ", ""));
        if (!token) {
            return res.status(403).json({
                message: "No token found in request"
            });
        }
        const validate = jsonwebtoken_1.default.verify(token, String(process.env.API_SECRET));
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "Unauthorized or invalid token"
        });
    }
}
exports.validateToken = validateToken;
