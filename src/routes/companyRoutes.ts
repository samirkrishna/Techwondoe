import express, { Router } from "express";
import { createCompany, getCompanyById, searchCompanyByName } from "../controllers/companyController";

const router: Router = express.Router();

router.post("/", createCompany);

router.get("/", getCompanyById);

router.get("/:companyName", searchCompanyByName);

export default router;
