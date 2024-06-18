import { Router } from "express";
import {
  createTagController,
  getAllTagsController,
  getOneTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/tags.controller.js";
import { checkTokenRole, checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post("/", checkToken, createTagController);
router.get("/", checkTokenRole, getAllTagsController);
router.get("/:id", checkTokenRole, getOneTaskController);
router.put("/:id", checkTokenRole, updateTaskController);
router.delete("/:id", checkTokenRole, deleteTaskController);

export default router;

/*
/tags                           /post
/tags                           /get
/tags/id                        /get
/tags/id                        /put
/tags/id                        /delet
*/
