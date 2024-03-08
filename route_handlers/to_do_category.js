const { ToDo } = require("../database/to_do");
const { ToDoCategory } = require("../database/to_do_category");

// Create ToDo Category
const createToDoCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id: userId } = req.user;
    const toDoCategories = await ToDoCategory.find({
      userId: userId,
      name: name,
    });
    if (toDoCategories.length > 0) {
      return res.status(400).json({ message: "given category already exist" });
    }
    const newToDoCategory = new ToDoCategory({ name, userId });
    await newToDoCategory.save();
    res.status(201).json(newToDoCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read All ToDo Categories
const getAllToDoCategories = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const toDoCategories = await ToDoCategory.find({ userId: userId });
    res.status(201).json(toDoCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ToDo Category
const updateToDoCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedToDoCategory = await ToDoCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(201).json(updatedToDoCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete ToDo Category
const deleteToDoCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const toDos = await ToDo.find({ categoryId: id });
    if (toDos.length === 0) {
      res.status(400).json({
        message:
          "category can not be deleted, items attached with this category",
      });
      return;
    }
    await ToDoCategory.findByIdAndDelete(id);
    res.status(201).json({ message: "ToDo category deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createToDoCategory,
  getAllToDoCategories,
  updateToDoCategory,
  deleteToDoCategory,
};
