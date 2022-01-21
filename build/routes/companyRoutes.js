"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyController_1 = require("../controllers/companyController");
const router = express_1.default.Router();
router.post("/", companyController_1.createCompany);
router.get("/", companyController_1.getCompanyById);
router.get("/:companyName", companyController_1.searchCompanyByName);
exports.default = router;
