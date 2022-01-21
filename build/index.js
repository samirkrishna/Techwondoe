"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const error_1 = require("./routes/error");
const pg_1 = __importDefault(require("pg"));
const app = (0, express_1.default)();
const PORT = 8000;
exports.pool = new pg_1.default.Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "password",
    port: 5432,
});
app.use(express_1.default.json());
app.use("/api/v1/company", companyRoutes_1.default);
app.use("/api/v1/team", teamRoutes_1.default);
app.use(error_1.error);
app.listen(PORT, () => {
    console.log(`App is up and running ${PORT}`);
});
