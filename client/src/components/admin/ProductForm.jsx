import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

const MAX_PHOTOS = 2;

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [serverPhotos, setServerPhotos] = useState([]); // filenames from server
  const [files, setFiles] = useState([]); // new files to upload

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    if (id) {
      api
        .get(`/admin/products/${id}`)
        .then(({ data }) => {
          setName(data.name || "");
          setDescription(data.description || "");
          setPrice(data.price || "");
          setCategory(data.category || "");
          setServerPhotos(data.images || []);
        })
        .catch((err) => console.error(" Fetch failed:", err));
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setServerPhotos([]);
      setFiles([]);
    }
  }, [id]);

  const previews = [
    ...serverPhotos.map((filename) => ({
      src: `${BASE_URL}/uploads/${filename}`,
      fromServer: true,
      filename,
    })),
    ...files.map((file) => ({
      src: URL.createObjectURL(file),
      fromServer: false,
      file,
    })),
  ];

  const handleAddPhotos = (incoming) => {
    const selected = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
    const total = serverPhotos.length + files.length + selected.length;
    if (total > MAX_PHOTOS) {
      setError(` Max ${MAX_PHOTOS} images allowed. Remove some photos first.`);
      return;
    }
    setError("");
    setFiles((prev) => [...prev, ...selected]);
  };

  const handleRemovePhoto = (index) => {
    const photo = previews[index];
    if (photo.fromServer) {
      setServerPhotos((prev) => prev.filter((p) => p !== photo.filename));
    } else {
      setFiles((prev) => prev.filter((f) => f !== photo.file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (serverPhotos.length + files.length !== MAX_PHOTOS) {
      setError(` Please select exactly ${MAX_PHOTOS} images before submitting`);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    files.forEach((file) => formData.append("images", file));
    serverPhotos.forEach((filename) => formData.append("existing", filename));

    setLoading(true);
    try {
      if (id) {
        await api.put(`/admin/products/${id}`, formData);
      } else {
        await api.post("/admin/products", formData);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error(" Submit failed:", err);
      setError(err?.response?.data?.msg || "Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 sm:p-8 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6  text-[#415D8A] text-center">
        {id ? "Edit Product" : "Create Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">


        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          rows="4"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleAddPhotos(e.target.files)}
          className="w-full"
        />
        <p className="text-sm text-gray-600">
          Upload exactly {MAX_PHOTOS} images (including existing).
        </p>

        <div className="flex flex-wrap gap-3">
          {previews.map((photo, idx) => (
            <div
              key={idx}
              className="relative w-24 h-24 border rounded overflow-hidden group"
            >
              <img
                src={photo.src}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(idx)}
                className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-bl p-1 opacity-0 group-hover:opacity-100 transition"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded text-sm font-semibold text-center">
            {error}
          </div>
        )}
       <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded font-bold text-white transition duration-200 ${
    loading
      ? "bg-[#ABBCDA] cursor-not-allowed"
      : "bg-[#415D8A] hover:bg-[#2f4d76]"
  }`}
>
  

          {loading ? "Saving..." : id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
