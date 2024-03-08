const { Url } = require("../database/url_saver");
const { UrlCategory } = require("../database/url_saver_category");

// Create Url Category
const createUrlCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id: userId } = req.user;
    const urlCategories = await UrlCategory.find({
      userId: userId,
      name: name,
    });
    if (urlCategories.length > 0) {
      return res.status(400).json({ message: "given category already exist" });
    }
    const newUrlCategory = new UrlCategory({ name, userId });
    await newUrlCategory.save();
    res.status(201).json(newUrlCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read All Url Categories
const getAllUrlCategories = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const urlCategories = await UrlCategory.find({ userId: userId });
    res.status(201).json(urlCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Url Category
const updateUrlCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedUrlCategory = await UrlCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(201).json(updatedUrlCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Url Category
const deleteUrlCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const urls = await Url.find({ categoryId: id });
    if (urls.length === 0) {
      res.status(400).json({
        message:
          "category can not be deleted, items attached with this category",
      });
      return;
    }
    await UrlCategory.findByIdAndDelete(id);
    res.status(201).json({ message: "Url category deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUrlCategory,
  getAllUrlCategories,
  updateUrlCategory,
  deleteUrlCategory,
};
