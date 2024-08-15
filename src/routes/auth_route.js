import express from "express";
import {
  authAccount,
  registerAccount,
} from "../controllers/auth_controller.js";
import { registerMiddleware } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/account/authenticate", authAccount);
router.post("/account/register", registerMiddleware, registerAccount);

export default router;
