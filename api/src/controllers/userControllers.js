import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import Joi from "joi";
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

// Login User with validation
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
// get user by name
export const getUserByName = async (req, res) => {
  try {
    const searchSchema = Joi.object({
      username: Joi.string().min(1).required(),
    });
    // Validation de l'entrée
    const { error } = searchSchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details[0].message,
      });
    }

    const { username } = req.query;

    // Utilisation de LIKE pour une recherche partielle
    const users = await User.findAll({
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
      attributes: { exclude: ["password"] },
    });

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
        errors: "No users found matching the search criteria",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    console.error("Error in getUserByName:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }
};
