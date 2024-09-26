import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addProduct, getAllCategories } from "../../api/Api";
import { IProduct, ICategory } from "../../@types";

export default function AddProductsPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Omit<IProduct, "id" | "createdAt" | "updatedAt">>();
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setError("root", {
          type: "manual",
          message: "Failed to fetch categories. Please try again.",
        });
      }
    };
    fetchCategories();
  }, [setError]);
  // Submit the form
  const onSubmit = async (
    data: Omit<IProduct, "id" | "createdAt" | "updatedAt"> & {
      id?: number;
      createdAt?: string;
      updatedAt?: string;
    }
  ) => {
    setLoading(true);
    try {
      await addProduct(data as IProduct); // Cast data to IProduct
      navigate("/products");
    } catch (error) {
      console.error("Failed to add product:", error);
      setError("root", {
        type: "manual",
        message: "Failed to add product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex grow justify-center items-center bg-gray-100">
      <div className="card bg-white w-full max-w-lg shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="card-title text-3xl text-gray-900 pb-4">
            Add Product
          </h2>

          {errors.root && (
            <p className="text-red-500 text-center">{errors.root.message}</p>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Product name"
              className={`input input-bordered bg-gray-200 ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Product description"
              className={`textarea textarea-bordered bg-gray-200 ${
                errors.description ? "textarea-error" : ""
              }`}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              className={`input input-bordered bg-gray-200 ${
                errors.price ? "input-error" : ""
              }`}
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input
              type="number"
              placeholder="Stock"
              className={`input input-bordered bg-gray-200 ${
                errors.stock ? "input-error" : ""
              }`}
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock must be positive" },
              })}
            />
            {errors.stock && (
              <p className="text-red-500 text-xs mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className={`select select-bordered bg-gray-200 ${
                errors.categoryId ? "select-error" : ""
              }`}
              {...register("categoryId", { required: "Category is required" })}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
