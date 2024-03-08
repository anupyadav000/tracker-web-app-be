const express = require("express");
const authenticateUser = require("../authentication/middleware");
const registerUser = require("../route_handlers/register");
const loginUser = require("../route_handlers/login");
const updateUser = require("../route_handlers/user");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.patch("/", authenticateUser, updateUser);

module.exports = userRouter;
