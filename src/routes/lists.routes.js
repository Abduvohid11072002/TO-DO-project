import { Router } from "express";
import {
  createListController,
  getListsController,
  getOneListController,
  updateListController,
  deleteListController,
} from "../controllers/lists.controller.js";

const router = Router();

router.post("/", createListController);
router.get("/", getListsController);
router.get("/:id", getOneListController);
router.put("/:id", updateListController);
router.delete("/:id", deleteListController);

export default router;

/*
/lists                          /post
/lists                          /get
/lists/id                       /get
/lists/id                       /put
/lists/id                       /delet
*/
