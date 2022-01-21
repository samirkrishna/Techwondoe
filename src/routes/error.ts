import { Request, Response } from "express";

export function error(req: Request, res: Response) {
  res.status(404).json({
    errorMessage: "Requested page not found"
  });
}
