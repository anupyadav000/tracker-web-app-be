const { Url } = require("../database/url_saver");
const { UrlCategory } = require("../database/url_saver_category");
const { User } = require("../database/user");

// Create URL
const createUrl = async (req, res) => {
  try {
    const { title, url, categoryId } = req.body;

    if (url === undefined || url.length === 0 || categoryId === undefined) {
      return res
        .status(404)
        .json({ message: "please provide valid input details" });
    }

    // Check if categoryId exists in the database
    const category = await UrlCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "URL category not found" });
    }

    const { id: userId } = req.user;

    const newUrl = new Url({ title, url, categoryId, userId });
    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read All URLs
const getAllUrls = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const urls = await Url.find({ userId: userId });
    res.status(201).json(urls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update URL
const updateUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, categoryId } = req.body;

    // Check if categoryId exists in the database
    const category = await UrlCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "URL category not found" });
    }

    const { id: userId } = req.user;

    const updatedUrl = await Url.findByIdAndUpdate(
      id,
      { title, url, categoryId, userId },
      { new: true }
    );
    res.status(201).json(updatedUrl);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete URL
const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    await Url.findByIdAndDelete(id);
    res.status(201).json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUrl,
  getAllUrls,
  updateUrl,
  deleteUrl,
};
