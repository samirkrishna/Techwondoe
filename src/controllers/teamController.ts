import express, { Request, Response, Router } from "express";
import { pool } from "../index";
import { v4 as uuidv4 } from "uuid";

const router: Router = express.Router();

export const createTeamByCompanyId = (req: Request, res: Response) => {
  const companyId = req.params.companyId;
  const { name } = req.body;

  if (!name) {
    return res.status(406).json({
      message: "Request body missing"
    });
  }
  try {
    const uuid = uuidv4();
    pool.query("INSERT INTO team (UUID,companyID,leadName) VALUES ($1,$2,$3)", [uuid, companyId, name], (error, results) => {
      if (error) {
        return res.sendStatus(500);
      }
      return res.status(201).send({ successMessage: `${name} created successfully ` });
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    let resp: any = [];
    const companies: any = await getCompanies();
    if (companies && companies.length > 0) {
      for (let index = 0; index < companies.length; index++) {
        let company = companies[index];
        let companyId = company.uuid;
        const teams = await pool.query("SELECT * FROM team WHERE companyID=$1", [companyId]);
        company.teams = teams.rows;
        resp.push(company);
      }
      return res.status(200).json(resp);
    } else {
      return res.sendStatus(204);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getCompanies = async () => {
  try {
    const companies = await pool.query("SELECT * FROM company", []);
    return companies.rows;
  } catch (error) {
    throw error;
  }
};

export default router;
