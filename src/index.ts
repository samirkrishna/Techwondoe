import express, { Application, Request, Response } from 'express';
import companyRoutes from './routes/companyRoutes'
import teamRoutes from './routes/teamRoutes'
import { error } from './routes/error'

// const Pool = require('pg').Pool

import Pool from 'pg';

const app: Application = express();

const PORT: Number = 8000;

export const pool = new Pool.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
})
console.log("inside index");



app.use(express.json())
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/team", teamRoutes);

app.use(error)
app.listen(PORT, (): void => {
    console.log(`App is up and running ${PORT}`);
})


