import express from "express";
import { exploreController } from "./explore.controller";

const router = express.Router();

// Create a new Explore
router.post("/", exploreController.createExplore);

// Get all Explores (Latest-first, likes-prioritized)
router.get("/", exploreController.getAllExplores);

// Get a specific Explore by ID (Supports `random=true` query)
router.get("/:id", exploreController.getExplore);

// Update a specific Explore by ID
router.patch("/:id", exploreController.updateExplore);

// Delete a specific Explore by ID
router.delete("/:id", exploreController.deleteExplore);

export const exploreRouter = router;
