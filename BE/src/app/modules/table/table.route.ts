import express from "express";
import { TableController } from "./table.controller";

const router = express.Router();

router.post("/", TableController.createTable);
router.get("/", TableController.getAllTables);
router.get("/:id", TableController.getTableById);
router.put("/:id", TableController.updateTable);
router.delete("/:id", TableController.deleteTable);

export const TableRouter = router;
