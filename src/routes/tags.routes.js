import { Router } from "express";
import {
  createTagController,
  getAllTagsController,
  getOneTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/tags.controller.js";

const router = Router();

router.post("/", createTagController);
router.get("/", getAllTagsController);
router.get("/:id", getOneTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;

/*
/tags                           /post
/tags                           /get
/tags/id                        /get
/tags/id                        /put
/tags/id                        /delet
*/
