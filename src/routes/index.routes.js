import { Router } from "express";
import authRoutes from "./auth.routes.js";
import listsRoutes from "./lists.routes.js";
import tagsRoutes from "./tags.routes.js";
import prioritiesRoutes from "./priorities.routes.js";
// import tasksRoutes from "./tasks.routes.js";


const router = Router();

router.use("/auth", authRoutes);
router.use("/lists", listsRoutes);
router.use("/tags", tagsRoutes);
router.use("/priorities", prioritiesRoutes);
// router.use("/tasks", tasksRoutes);

export default router;
/*
/auth/signup                    /post
/auth/verify-otp                /post
/auth/signin                    /post
/auth/me                        /get
/auth/logout                    /get
/auth/refresh-token             /post

/tasks                          /post
/tasks                          /get
/tasks/id                       /get
/tasks/id                       /put
/tasks/id                       /delet

/lists                          /post
/lists                          /get
/lists/id                       /get
/lists/id                       /put
/lists/id                       /delet

/tags                           /post
/tags                           /get
/tags/id                        /get
/tags/id                        /put
/tags/id                        /delet

/priorities                     /post
/priorities                     /get
/priorities/id                  /get
/priorities/id                  /put
/priorities/id                  /delet
*/