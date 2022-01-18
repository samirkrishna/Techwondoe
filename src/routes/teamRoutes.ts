import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();


router.post('/:companyId', (req: Request, res: Response) => {
    const companyId = req.params.companyId;
    const { name } = req.body;
    res.status(200).json({ name, companyId })
})

router.get("/allteams", (req: Request, res: Response) => {
    res.status(200).json([{ "name": "name" }, { "name": "name" }])
})

export default router;