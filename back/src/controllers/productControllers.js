import { models } from "../models/index.js";
import { Op } from "sequelize";
import Joi from "joi";
const { Product, Category } = models;

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error in getAllproducts:", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching products",
      error: error.message,
    });
  }
};

// Search product by name
export const getProductByName = async (req, res) => {
  const searchSchema = Joi.object({
    name: Joi.string().min(1).required(),
  });
  try {
    const { error } = searchSchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details[0].message,
      });
    }

    const { name } = req.query;

    const product = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      limit: 15,
    });
    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        errors: "No product found with this criteria",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product found",
      data: product,
    });
  } catch (error) {
    console.error("Error in getProductByName:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products",
      error: error.message,
    });
  }
};

// Get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        errors: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product found",
      data: product,
    });
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching product",
      error: error.message,
    });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({
      success: false,
      message: "Error while creating product",
      error: error.message,
    });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating product",
      error: error.message,
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Error while deleting product",
      error: error.message,
    });
  }
};
