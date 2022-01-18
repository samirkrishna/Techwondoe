import express, { Application, Request, Response } from 'express';
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
    res.status(200).json(req.body);
})

router.get("/", (req: Request, res: Response) => {
    res.send(req.query.companyId)
})

router.get('/:companyName', (req: Request, res: Response) => {
    res.send(req.params.companyName)
})



export default router;