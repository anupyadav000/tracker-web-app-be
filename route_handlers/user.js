const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../database/user");

const updateUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, imageUrl } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const { id: userId } = req.user;

    // Update user details
    await User.findByIdAndUpdate(userId, {
      name,
      email,
      phoneNumber,
      hashedPassword,
      imageUrl,
    });

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = updateUser;
