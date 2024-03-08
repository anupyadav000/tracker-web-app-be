const express = require("express");
const {
  createUrlCategory,
  getAllUrlCategories,
  updateUrlCategory,
  deleteUrlCategory,
} = require("../route_handlers/url_saver_category");
const {
  createUrl,
  getAllUrls,
  updateUrl,
  deleteUrl,
} = require("../route_handlers/url_saver");
const authenticateUser = require("../authentication/middleware");
const urlSaverRouter = express.Router();

urlSaverRouter.use(authenticateUser);
urlSaverRouter.post("/category", createUrlCategory);
urlSaverRouter.get("/category", getAllUrlCategories);
urlSaverRouter.patch("/category/:id", updateUrlCategory);
urlSaverRouter.delete("/category/:id", deleteUrlCategory);

urlSaverRouter.post("/", createUrl);
urlSaverRouter.get("/", getAllUrls);
urlSaverRouter.patch("/:id", updateUrl);
urlSaverRouter.delete("/:id", deleteUrl);

module.exports = urlSaverRouter;
