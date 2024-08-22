import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../api/Api";

export default function AddProductsPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setLoading(true);
    try {
      await addProduct({ name, description, price, stock, category });
      navigate("/products");
    } catch (error) {
      console.error("Failed to add product", error);
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex grow justify-center items-center bg-gray-100">
      <div className="card bg-white w-full max-w-lg shadow-2xl">
        <form onSubmit={handleSave} className="card-body">
          <h2 className="card-title text-3xl text-gray-900 pb-4">
            Add Product
          </h2>

          {/* Afficher les erreurs */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="name"
              className="input input-bordered bg-gray-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="description"
              className="input input-bordered bg-gray-200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="price"
              className="input input-bordered bg-gray-200"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="stock"
              className="input input-bordered bg-gray-200"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"} {/* Bouton de soumission */}
              </button>
            </div>
            <div className="form-control mt-6"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
