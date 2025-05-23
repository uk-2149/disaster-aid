import express from "express";
import { recording } from "../controllers/recording";

const router = express.Router();

router.get("/:id", recording);

export default router;
