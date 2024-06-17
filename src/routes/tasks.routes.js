import { Router } from "express";
import {
  createTaskController,
  getAllTaskController,
  getOneTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/tasks.controller.js";

const router = Router();

router.post("/", createTaskController);
router.get("/", getAllTaskController);
router.get("/:id", getOneTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;

/*
/tasks                          /post
/tasks                          /get
/tasks/id                       /get
/tasks/id                       /put
/tasks/id                       /delet
*/
