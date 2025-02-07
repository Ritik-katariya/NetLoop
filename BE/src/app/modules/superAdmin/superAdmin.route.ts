import express from "express";
import { superAdminController } from "./superAdmin.controller";
import auth from "../../middlewares/auth";
import { SuperAdminRole } from "./superAdmin.middleware";

const router = express.Router();

// Public routes
router.post("/create", superAdminController.createSuperAdmin); // Only for initial setup
router.post("/login", superAdminController.loginSuperAdmin);

// Protected routes
router.get(
  "/:id",
  auth(),
  SuperAdminRole(),
  superAdminController.getSuperAdminById
);

router.patch(
  "/:id",
  auth(),
  SuperAdminRole(),
  superAdminController.updateSuperAdmin
);

export const superAdminRouter = router; 