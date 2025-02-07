import express from "express";
import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { AdminRole } from "./admin.middleware";

const router = express.Router();

// Public routes
router.post("/login", adminController.loginAdmin);

// Protected routes
router.post(
  "/create",
  auth(),
  AdminRole("SUPER_ADMIN"),
  adminController.createAdmin
);

router.get(
  "/all",
  auth(),
  AdminRole("ADMIN", "SUPER_ADMIN"),
  adminController.getAllAdmins
);

router.get(
  "/:id",
  auth(),
  AdminRole("ADMIN", "SUPER_ADMIN"),
  adminController.getAdminById
);

router.patch(
  "/:id",
  auth(),
  AdminRole("SUPER_ADMIN"),
  adminController.updateAdmin
);

router.delete(
  "/:id",
  auth(),
  AdminRole("SUPER_ADMIN"),
  adminController.deleteAdmin
);

export const adminRouter = router; 