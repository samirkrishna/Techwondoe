"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTeams = exports.createTeamByCompanyId = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const uuid_1 = require("uuid");
const router = express_1.default.Router();
const createTeamByCompanyId = (req, res) => {
    const companyId = req.params.companyId;
    const { name } = req.body;
    if (!name) {
        return res.status(406).json({
            message: "Request body missing"
        });
    }
    try {
        const uuid = (0, uuid_1.v4)();
        index_1.pool.query("INSERT INTO team (UUID,companyID,leadName) VALUES ($1,$2,$3)", [uuid, companyId, name], (error, results) => {
            if (error) {
                return res.sendStatus(500);
            }
            return res.status(201).send({ successMessage: `${name} created successfully ` });
        });
    }
    catch (error) {
        return res.sendStatus(500);
    }
};
exports.createTeamByCompanyId = createTeamByCompanyId;
const getAllTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resp = [];
        const companies = yield getCompanies();
        if (companies && companies.length > 0) {
            for (let index = 0; index < companies.length; index++) {
                let company = companies[index];
                let companyId = company.uuid;
                const teams = yield index_1.pool.query("SELECT * FROM team WHERE companyID=$1", [companyId]);
                company.teams = teams.rows;
                resp.push(company);
            }
            return res.status(200).json(resp);
        }
        else {
            return res.sendStatus(204);
        }
    }
    catch (error) {
        return res.sendStatus(500);
    }
});
exports.getAllTeams = getAllTeams;
const getCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield index_1.pool.query("SELECT * FROM company", []);
        return companies.rows;
    }
    catch (error) {
        throw error;
    }
});
exports.default = router;
