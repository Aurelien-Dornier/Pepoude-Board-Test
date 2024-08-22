import { models } from "../models/index.js";
import Joi from "joi";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";
const { Category, Product } = models;

const categorySchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
});

//get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("error in get all categories", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get category by id
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: "products" }],
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        error: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("error in get category by id", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// search category by name
export const getCategoryByName = async (req, res) => {
  try {
    const { name } = req.query;
    const categories = await Category.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("error in get category by name", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// create category
export const createCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.details[0].message,
      });
    }
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("error in create category", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const { error } = categorySchema.validate(updateData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details[0].message,
      });
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Mise à jour partielle
    await category.update(updateData);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating category",
      error: error.message,
    });
  }
};

// delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        error: "Category not found",
      });
    }
    await category.destroy();
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("error in delete category", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get statistics
export const getCategoryStatistics = async (req, res) => {
  try {
    const totalCategories = await Category.count();
    const categoriesWithProductsCount = await Category.findAll({
      attributes: [
        "id",
        "name",
        [Sequelize.fn("COUNT", Sequelize.col("products.id")), "productCount"],
      ],
      include: [
        {
          model: Product,
          as: "products",
          attributes: [],
        },
      ],
      group: ["Category.id"],
      raw: true,
    });
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: {
        totalCategories,
        categoriesWithProductsCount,
      },
    });
  } catch (error) {
    console.error("error in get category statistics", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
