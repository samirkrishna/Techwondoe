"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCompanyByName = exports.getCompanyById = exports.createCompany = void 0;
const index_1 = require("../index");
const uuid_1 = require("uuid");
const createCompany = (req, res) => {
    const { name, ceo, address, date } = req.body;
    const uuid = (0, uuid_1.v4)();
    index_1.pool.query('INSERT INTO company (UUID,name,ceo,address,inceptiondate) VALUES ($1, $2,$3,$4,$5)', [uuid, name, ceo, address, date], (error, results) => {
        if (error) {
            return res.status(400).json({ "errorMessage": error.message });
        }
        return res.status(201).send({ "successMessage": `${name} created successfully ` });
    });
};
exports.createCompany = createCompany;
const getCompanyById = (req, res) => {
    const companyId = req.query.companyId;
    index_1.pool.query('SELECT * FROM company WHERE UUID=$1', [companyId], (error, results) => {
        if (error) {
            return res.status(400).json({ "errorMessage": error.message });
        }
        const result = results.rows[0];
        return res.status(201).send(Object.assign({}, result));
    });
};
exports.getCompanyById = getCompanyById;
const searchCompanyByName = (req, res) => {
    const companyName = req.params.companyName;
    index_1.pool.query('SELECT * FROM company WHERE name=$1', [companyName], (error, results) => {
        if (error) {
            return res.status(400).json({ "errorMessage": error.message });
        }
        const result = results.rows;
        if (result.length == 0) {
            return res.status(200).send({ "message": `${companyName} not found` });
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
};
exports.searchCompanyByName = searchCompanyByName;
