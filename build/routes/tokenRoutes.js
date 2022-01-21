"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const token = jsonwebtoken_1.default.sign({
        access: true
    }, String(process.env.API_SECRET), {
        expiresIn: "30m"
    });
    const options = {
        expires: new Date(Date.now() + 1 * 4 * 60 * 60 * 1000),
        httpsOnly: true
    };
    res.cookie("token", token, options);
    return res.json({
        token,
        expiresIn: "30m"
    });
});
exports.default = router;
