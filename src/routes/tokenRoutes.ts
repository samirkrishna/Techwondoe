import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  const token = jwt.sign(
    {
      access: true
    },
    String(process.env.API_SECRET),
    {
      expiresIn: "30m"
    }
  );

  const options = {
    expires: new Date(Date.now() + 1 * 4 * 60 * 60 * 1000),
    httpsOnly: true
  };

  res.cookie("token", token, options);

  return res.json({
    token,
    expiresIn: "30m"
  });
});

export default router;
