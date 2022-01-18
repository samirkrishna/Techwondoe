import express, { Request, Response } from 'express';
const router = express.Router();

export function error(req: Request, res: Response) {
    res.status(404).json({
        "errorMessage": "Requested page not found"
    })
}