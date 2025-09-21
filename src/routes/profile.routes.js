import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getPublicProfile,
  getPrivateProfile,
  updatePrivateProfile,
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/public", getPublicProfile);

router.get("/private", authMiddleware, getPrivateProfile);

router.patch("/private", authMiddleware, updatePrivateProfile)

export default router;
