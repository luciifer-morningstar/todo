import express from "express";
import user from "./user";
import subscription from "./subscription";
const router = express.Router();
router.use("/user", user);
router.use("/subscription", subscription);
export default router;