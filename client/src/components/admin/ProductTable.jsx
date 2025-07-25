import { useState } from "react";
import { Link } from "react-router-dom";

const truncate = (text, maxLength = 80) =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

const ProductTable = ({ products, onDelete }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      setMessage({ type: "success", text: "Product deleted successfully." });
    } catch (err) {
      setMessage({ type: "error", text: " Failed to delete product." });
    } finally {
      setConfirmDeleteId(null);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000); 
    }
  };

  if (products.length === 0) {
    return <p className="text-center text-gray-600">No products found.</p>;
  }

  return (
    <div className="overflow-x-auto shadow rounded-lg bg-white">
      {message.text && (
        <div
          className={`p-3 text-sm text-center font-medium ${
            message.type === "success"
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          }`}
        >
          {message.text}
        </div>
      )}

      <table className="min-w-full text-sm text-left">
        <thead className="bg-[#415D8A] text-white">
          <tr>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-b hover:bg-gray-50 transition-all"
            >
              <td className="py-3 px-4 font-medium text-gray-800">
                {product.name}
              </td>
              <td className="py-3 px-4">₹{product.price}</td>
              <td className="py-3 px-4">{product.category || "—"}</td>
              <td className="py-3 px-4 text-gray-600 max-w-xs">
                {truncate(product.description || "—")}
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <Link
                    to={`/admin/product/${product._id}`}
                    className="bg-[#415D8A] hover:bg-[#2f4d76] text-white text-sm px-3 py-1 rounded transition duration-200"
                  >
                    Edit
                  </Link>

                  {confirmDeleteId === product._id ? (
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Confirm?
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-gray-600 hover:text-black text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
