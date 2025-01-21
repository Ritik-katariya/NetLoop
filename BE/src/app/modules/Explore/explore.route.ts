import express, { NextFunction, Request, Response } from "express";
import { exploreController } from "./explore.controller";

const router = express.Router();

// Create a new Explore
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  return exploreController.createExplore(req, res, next);
});

// Get all Explores
router.get("/", exploreController.getAllExplores);

// Get a specific Explore by ID
router.get("/:id?", exploreController.getExplore);

// Update a specific Explore by ID
router.patch("/:id?", (req: Request, res: Response, next: NextFunction) => {
  return exploreController.updateExplore(req, res, next);
});

// Delete a specific Explore by ID
router.delete("/:id?", exploreController.deleteExplore);

export const exploreRouter = router;
