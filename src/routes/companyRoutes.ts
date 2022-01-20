import express, { Application, Request, Response } from 'express';
import { pool } from '../index';
import { v4 as uuid4 } from 'uuid'
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
    const { name, ceo, address, date } = req.body;
    const uuid = uuid4();
    pool.query('INSERT INTO company (UUID,name,ceo,address,inceptiondate) VALUES ($1, $2,$3,$4,$5)', [uuid, name, ceo, address, date], (error, results) => {
        if (error) {
            return res.status(400).json({ "errorMessage": error.message })
        }
        return res.status(201).send({ "successMessage": `${name} created successfully ` })
    });
})

router.get("/", (req: Request, res: Response) => {
    const companyId = req.query.companyId
    pool.query('SELECT * FROM company WHERE UUID=$1', [companyId], (error, results) => {
        if (error) {
            return res.status(400).json({ "errorMessage": error.message })
        }
        const result = results.rows[0];
        return res.status(201).send({ ...result })
    });
})

router.get('/:companyName', (req: Request, res: Response) => {
    const companyName = req.params.companyName;
    pool.query('SELECT * FROM company WHERE name=$1', [companyName], (error, results) => {
        if (error) {
            return res.status(400).json({ "errorMessage": error.message })
        }
        const result = results.rows;
        if (result.length == 0) {
            return res.status(200).send({ "message": `${companyName} not found` })
        }
        const companies = [];
        if (result.length > 0) {
            result.forEach((company) => {
                companies.push(company);
            });
        } else {
            companies.push(result[0])
        }
        return res.status(201).send(companies)
    });
    // res.send(req.params.companyName)
})



export default router;