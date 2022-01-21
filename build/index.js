"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const tokenRoutes_1 = __importDefault(require("./routes/tokenRoutes"));
const error_1 = require("./routes/error");
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const pg_1 = __importDefault(require("pg"));
const auth_1 = require("./middlewares/auth");
const app = (0, express_1.default)();
const PORT = parseInt(String(process.env.PORT)) || 8000;
exports.pool = new pg_1.default.Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(String(process.env.DB_PORT))
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/token", tokenRoutes_1.default);
app.use("/api/v1/company", auth_1.validateToken, companyRoutes_1.default);
app.use("/api/v1/team", auth_1.validateToken, teamRoutes_1.default);
app.use(error_1.error);
app.listen(PORT, () => {
    console.log(`App is up and running ${PORT}`);
});
