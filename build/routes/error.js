"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
function error(req, res) {
    res.status(404).json({
        errorMessage: "Requested page not found"
    });
}
exports.error = error;
