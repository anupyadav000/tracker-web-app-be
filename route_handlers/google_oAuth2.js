const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../database/user");
const jwt = require("jsonwebtoken");

const handleGoogleSignInCallback = async (req, res) => {
  try {
    const { id, email, verified_email, name, picture } = req.body;
    if (!verified_email) {
      res.status(400).json({ message: "Email not verified" });
    }
    const newUser = new User({
      name,
      email,
      googleUserId: id,
      imageUrl: picture,
    });
    await newUser.save();
    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const handleGoogleLogInCallback = async (req, res) => {
  try {
    const { id, email, verified_email, name, picture } = req.body;
    if (!verified_email) {
      res.status(400).json({ message: "Email not verified" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user || user == undefined || user === null) {
      const newUser = new User({
        name,
        email,
        googleUserId: id,
        imageUrl: picture,
      });
      await newUser.save();
      const user = await User.findOne({ email });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.status(200).json({ token });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  handleGoogleSignInCallback,
  handleGoogleLogInCallback,
};
