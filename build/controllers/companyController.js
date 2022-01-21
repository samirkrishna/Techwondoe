"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCompanyByName = exports.getCompanyById = exports.createCompany = void 0;
const index_1 = require("../index");
const uuid_1 = require("uuid");
const createCompany = (req, res) => {
    const { name, ceo, address, date } = req.body;
    if (!name || !ceo || !address || !date) {
        return res.status(406).json({
            errorMessage: "Request body fields are missing"
        });
    }
    const uuid = (0, uuid_1.v4)();
    try {
        index_1.pool.query("INSERT INTO company (UUID,name,ceo,address,inceptiondate) VALUES ($1,$2,$3,$4,$5)", [uuid, name, ceo, address, date], (error, results) => {
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
exports.createCompany = createCompany;
const getCompanyById = (req, res) => {
    const companyId = req.query.companyId;
    if (!companyId) {
        return res.status(406).json({
            errorMessage: "Request Query params missing"
        });
    }
    try {
        index_1.pool.query("SELECT * FROM company WHERE UUID=$1", [companyId], (error, results) => {
            if (error) {
                return res.sendStatus(500);
            }
            const result = results.rows[0];
            return res.status(201).send(Object.assign({}, result));
        });
    }
    catch (error) {
        return res.sendStatus(500);
    }
};
exports.getCompanyById = getCompanyById;
const searchCompanyByName = (req, res) => {
    const companyName = req.params.companyName;
    if (!companyName) {
        return res.status(406).json({
            errorMessage: "Request Path params missing"
        });
    }
    try {
        index_1.pool.query("SELECT * FROM company WHERE name=$1", [companyName], (error, results) => {
            if (error) {
                return res.status(400).json({ errorMessage: error.message });
            }
            const result = results.rows;
            if (result.length == 0) {
                return res.status(200).send({ message: `${companyName} not found` });
            }
            const companies = [];
            if (result.length > 0) {
                result.forEach((company) => {
                    companies.push(company);
                });
            }
            else {
                companies.push(result[0]);
            }
            return res.status(201).send(companies);
        });
    }
    catch (error) {
        return res.sendStatus(500);
    }
};
exports.searchCompanyByName = searchCompanyByName;
