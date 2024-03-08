const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../database/user");

const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, imageUrl } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phoneNumber,
      hashedPassword,
      imageUrl,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = registerUser;
