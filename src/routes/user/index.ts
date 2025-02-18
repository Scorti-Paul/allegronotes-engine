import { userLogin, userSignUp } from "./../../controllers/user";

const express = require("express");

const router = express?.Router();

router.post("/api/user/sign-up", userSignUp);
router.post("/api/user/login", userLogin);

const userRoutes = router;
export { userRoutes };
