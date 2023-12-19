import express from "express";
import {
  blockUser,
  deleteUser,
  makeAdmin,
  userList,
} from "../controllers/admin.controller.js";
import { verifyToken, verifyAdmin } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/users",  userList);
router.post("/makeadmin/:id",  makeAdmin);
router.post("/block/:id",  blockUser);
router.delete("/delete/:id",  deleteUser);

export default router;
