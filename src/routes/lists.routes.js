import { Router } from "express";
import {
  createListController,
  getListsController,
  getOneListController,
  updateListController,
  deleteListController,
} from "../controllers/lists.controller.js";
import { checkTokenRole, checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post("/", checkToken, createListController);
router.get("/", checkTokenRole, getListsController);
router.get("/:id", checkTokenRole, getOneListController);
router.put("/:id", checkTokenRole, updateListController);
router.delete("/:id", checkTokenRole, deleteListController);

export default router;

/*
/lists                          /post
/lists                          /get
/lists/id                       /get
/lists/id                       /put
/lists/id                       /delet
*/
