import { Router } from "express";
import {
  createTaskController,
  getAllTaskController,
  getOneTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/tasks.controller.js";
import { checkTokenRole, checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post("/", checkToken, createTaskController);
router.get("/", checkTokenRole, getAllTaskController);
router.get("/:id", checkTokenRole, getOneTaskController);
router.put("/:id", checkTokenRole, updateTaskController);
router.delete("/:id", checkTokenRole, deleteTaskController);

export default router;

/*
/tasks                          /post
/tasks                          /get
/tasks/id                       /get
/tasks/id                       /put
/tasks/id                       /delet
*/
