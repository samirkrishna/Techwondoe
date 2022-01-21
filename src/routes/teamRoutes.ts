import express, { Router } from "express";
import { createTeamByCompanyId, getAllTeams } from "../controllers/teamController";

const router: Router = express.Router();

router.post("/:companyId", createTeamByCompanyId);

router.get("/allteams", getAllTeams);

export default router;
