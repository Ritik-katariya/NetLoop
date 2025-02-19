import express from "express";
import { exploreController } from "./explore.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Create a new Explore
router.post("/",auth(), exploreController.createExplore);

// Get all Explores (Latest-first, likes-prioritized)
router.get("/",auth(), exploreController.getAllExplores);

// Get a specific Explore by ID (Supports `random=true` query)
router.get("/:id",auth(), exploreController.getExplore);

// Update a specific Explore by ID
router.patch("/:id",auth(), exploreController.updateExplore);

// Delete a specific Explore by ID
router.delete("/:id",auth(), exploreController.deleteExplore);

export const exploreRouter = router;
