import express, { Application } from "express";
import companyRoutes from "./routes/companyRoutes";
import teamRoutes from "./routes/teamRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import { error } from "./routes/error";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import Pool from "pg";
import { validateToken } from "./middlewares/auth";

const app: Application = express();

const PORT: Number = parseInt(String(process.env.PORT)) || 8000;

export const pool = new Pool.Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(String(process.env.DB_PORT))
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/token", tokenRoutes);
app.use("/api/v1/company", validateToken, companyRoutes);
app.use("/api/v1/team", validateToken, teamRoutes);

app.use(error);
app.listen(PORT, (): void => {
  console.log(`App is up and running ${PORT}`);
});
