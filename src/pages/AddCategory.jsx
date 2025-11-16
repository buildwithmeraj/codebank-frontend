import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Plus, Upload, ChevronRight } from "lucide-react";
import Error from "../components/utilities/Error";

const AddCategory = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const imageRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp|svg))/gi;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const image = e.target.image.value.trim();

    if (!title || !image) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!imageRegex.test(image)) {
      setError("Invalid image URL");
      return;
    }

    const formData = {
      title,
      image,
    };

    try {
      await axiosSecure.post("/categories", formData);
      Swal.fire({
        title: "Category",
        text: `Category added successfully.`,
        icon: "success",
      });
      e.target.reset();
      navigate(`/categories/`);
    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Failed to submit category. Please try again.");
    }
  };

  return (
    <>
      <nav
        className="flex x-2 md:px-4 lg:px-8 justify-center"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
            >
              Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <ChevronRight size={18} />
            <Link
              to="/categories"
              className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
            >
              Categories
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center space-x-1.5">
              <ChevronRight size={18} />
              <span className="inline-flex items-center text-sm font-medium text-body-subtle">
                Add Category
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <title>Add Category - CodeBank</title>
      <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
        <h1 className="">Add Category</h1>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-medium">Category Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://imgbb.com/...."
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" className="btn btn-primary flex-1">
              <Plus size={20} />
              Add
            </button>
            <a
              className="btn btn-secondary flex-1"
              href="https://imgbb.com/"
              target="_blank"
            >
              <Upload size={20} />
              Upload Image
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
