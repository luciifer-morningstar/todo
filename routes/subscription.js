import express from "express";
import { subscriptionController } from "../controllers";
import { validate } from "../helpers/custom.validation";
import { isUserAuth } from "../middleware/auth.middleware";
import { subscriptionValidator } from "../validators";

const router = express.Router({ mergeParams: true });

router.post("/", isUserAuth, validate(subscriptionValidator.create), subscriptionController.create);
router.put("/:id", isUserAuth, validate(subscriptionValidator.update), subscriptionController.update);
router.get("/:id", isUserAuth, subscriptionController.getById);
router.get("/", isUserAuth, subscriptionController.getSubscriptionWithPagination);
router.delete("/:id", isUserAuth, subscriptionController.destroy);

export default router;
