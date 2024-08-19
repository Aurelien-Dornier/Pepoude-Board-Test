import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { models } from "../models/index.js";

const { User } = models;

// Register User with validation
export const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        errors: "email already exists",
      });
    }
    const newUser = await User.create({ email, password, username });

    const userWithoutPassword = newUser.get({ plain: true });
    delete userWithoutPassword.password;

    const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: "User registered",
      data: userWithoutPassword,
      token,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({ message: e.message, field: e.path })),
      });
    }
    console.error("🚨 Error registering user:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", errors: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        errors: "Email and password are required",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
        errors: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
        errors: "Invalid password",
      });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "User logged in",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error("🚨 Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      message: "users fetched",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "error while fetching users...",
      error: error.message,
    });
  }
};
