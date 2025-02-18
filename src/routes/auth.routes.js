import { Router } from "express";
import {
  signupController,
  verify_otpController,
  signinController,
  getMeController,
  logoutController,
  refresh_tokenController,
} from "../controllers/auth.controller.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post("/signup", signupController);
router.post("/verify-otp", verify_otpController);
router.post("/signin", signinController);
router.get("/me", checkToken, getMeController);
router.get("/logout", checkToken, logoutController);
router.post("/refresh-token", refresh_tokenController);

export default router;

/*
/auth/signup                    /post
/auth/verify-otp                /post
/auth/signin                    /post
/auth/me                        /get
/auth/logout                    /get
/auth/refresh-token             /post
*/
