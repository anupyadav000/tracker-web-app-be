const { ToDo } = require("../database/to_do");
const { ToDoCategory } = require("../database/to_do_category");
const { User } = require("../database/user");

// Create ToDo
const createToDo = async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;

    if (title === undefined || title.length === 0 || categoryId === undefined) {
      return res
        .status(400)
        .json({ message: "please provide valid input details" });
    }

    // Check if categoryId exists in the database
    const category = await ToDoCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "ToDo category not found" });
    }

    const { id: userId } = req.user;

    const newToDo = new ToDo({ title, description, categoryId, userId });
    await newToDo.save();
    res.status(201).json(newToDo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read All ToDos
const getAllToDos = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const toDos = await ToDo.find({ userId: userId });
    res.status(201).json(toDos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ToDo
const updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId } = req.body;

    // Check if categoryId exists in the database
    const category = await ToDoCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "ToDo category not found" });
    }

    const { id: userId } = req.user;

    const updatedToDo = await ToDo.findByIdAndUpdate(
      id,
      { title, description, categoryId, userId },
      { new: true }
    );
    res.status(201).json(updatedToDo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete ToDo
const deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    await ToDo.findByIdAndDelete(id);
    res.status(201).json({ message: "ToDo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createToDo,
  getAllToDos,
  updateToDo,
  deleteToDo,
};
