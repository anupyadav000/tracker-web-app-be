const express = require("express");
const {
  handleGoogleSignInCallback,
  handleGoogleLogInCallback,
} = require("../route_handlers/google_oAuth2");
const googleRouter = express.Router();

googleRouter.post("/signin", handleGoogleSignInCallback);
googleRouter.post("/login", handleGoogleLogInCallback);

module.exports = googleRouter;
