import { Router } from "express";
import {
  createPriorityController,
  getAllPrioritiesController,
  getOnePriorityController,
  updatePriorityController,
  deletePriorityController,
} from "../controllers/priorities.controller.js";
import { checkTokenRole, checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post("/", checkToken, createPriorityController);
router.get("/",checkTokenRole, getAllPrioritiesController);
router.get("/:id", checkTokenRole, getOnePriorityController);
router.put("/:id", checkTokenRole, updatePriorityController);
router.delete("/:id", checkTokenRole, deletePriorityController);

export default router;

/*
/priorities                     /post
/priorities                     /get
/priorities/id                  /get
/priorities/id                  /put
/priorities/id                  /delet
*/
