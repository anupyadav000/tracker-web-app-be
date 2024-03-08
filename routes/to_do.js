const express = require("express");
const {
  createToDoCategory,
  getAllToDoCategories,
  updateToDoCategory,
  deleteToDoCategory,
} = require("../route_handlers/to_do_category");
const {
  createToDo,
  getAllToDos,
  updateToDo,
  deleteToDo,
} = require("../route_handlers/to_do");
const authenticateUser = require("../authentication/middleware");
const toDoRouter = express.Router();

toDoRouter.use(authenticateUser);

toDoRouter.post("/category", createToDoCategory);
toDoRouter.get("/category", getAllToDoCategories);
toDoRouter.patch("/category/:id", updateToDoCategory);
toDoRouter.delete("/category/:id", deleteToDoCategory);

toDoRouter.post("/", createToDo);
toDoRouter.get("/", getAllToDos);
toDoRouter.patch("/:id", updateToDo);
toDoRouter.delete("/:id", deleteToDo);

module.exports = toDoRouter;
