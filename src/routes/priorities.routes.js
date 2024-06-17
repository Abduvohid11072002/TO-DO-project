import { Router } from "express";
import {
  createPriorityController,
  getAllPrioritiesController,
  getOnePriorityController,
  updatePriorityController,
  deletePriorityController,
} from "../controllers/priorities.controller.js";

const router = Router();

router.post("/", createPriorityController);
router.get("/", getAllPrioritiesController);
router.get("/:id", getOnePriorityController);
router.put("/:id", updatePriorityController);
router.delete("/:id", deletePriorityController);

export default router;

/*
/priorities                     /post
/priorities                     /get
/priorities/id                  /get
/priorities/id                  /put
/priorities/id                  /delet
*/
