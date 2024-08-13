import express from "express";
import { authAccount } from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/account/authenticate", authAccount);

export default router;