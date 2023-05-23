import express from "express";
import { userController } from "../controllers";
import { validate } from "../helpers/custom.validation";
import { isUserAuth } from "../middleware/auth.middleware";
import { userValidator } from "../validators";

const router = express.Router({ mergeParams: true });

router.post("/login", validate(userValidator.login), userController.login);
router.post("/register", validate(userValidator.register), userController.register);
router.get("/", isUserAuth, userController.getUsersWithPagination);

export default router;
