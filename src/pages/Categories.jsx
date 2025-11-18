import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Loading from "../components/utilities/Loading";
import {
  TriangleAlert,
  Plus,
  ChevronRight,
  Tags,
  PencilLine,
  Folder,
  Trash2,
  SquarePen,
  X,
  CheckCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import SearchComponent from "../components/Search";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(null);
  const [updating, setUpdating] = useState(false);
  const axiosSecure = useAxiosSecure();

  const fetchCategories = () => {
    axiosSecure.get(`/categories`).then((data) => {
      setCategories(data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (category) => {
    // Use the passed-in `category` directly instead of `selectedCategory`
    const result = await Swal.fire({
      title: "Category",
      html: `Do you want to delete ${category.title}? <div class="flex justify-center text-warning mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></div>
      <p class="text-warning mt-2 ">Deleting this category will also delete all codes associated with this category.</p>`,
      showCancelButton: true,
      confirmButtonText: `<span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2 inline-block"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Delete</span>`,
      cancelButtonText: `<span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Cancel</span>`,
      confirmButtonColor: "red",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/categories/${category._id}`);
        Swal.fire({
          title: "Category",
          text: `Deleted "${category.title}" successfully.`,
          icon: "success",
        });

        setCategories((prev) => prev.filter((i) => i._id !== category._id));
      } catch (error) {
        toast.error("Failed to delete category: " + error.message);
      }
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const formData = {
      title: form.title.value.trim(),
      image: form.image.value.trim(),
    };

    if (!formData.title || !formData.image) {
      toast.error("Please fill in all required fields.");
      setUpdating(false);
      return;
    }

    try {
      await axiosSecure.patch(`/categories/${editCategory._id}`, formData);
      Swal.fire({
        title: "Category",
        text: `Category updated successfully.`,
        icon: "success",
      });
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      toast.error("Failed to update category: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <title>My Categories - CodeBank</title>
      <nav
        className="flex x-2 md:px-4 lg:px-8 justify-center mb-4"
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
          <li aria-current="page">
            <div className="flex items-center space-x-1.5">
              <ChevronRight size={18} />
              <span className="inline-flex items-center text-sm font-medium text-body-subtle">
                Categories
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <SearchComponent />
      <div className="px-2 md:px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <h2>
            My Categories
            {categories.length === 0 ? "" : ` (${categories.length})`}
          </h2>
          <Link to="/add-category" className="btn btn-success text-white">
            <Plus size={20} />
            Add<span className="hidden md:inline-block"> Category</span>
          </Link>
        </div>
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="flex flex-col items-center justify-center w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-md p-6 text-center">
              <TriangleAlert size={70} className="text-gray-500 text-center" />
              <p className="text-2xl text-base-content/70">
                You don't have any categories.
              </p>
              <div className="mt-4">
                <Link className="btn btn-success" to="/add-category">
                  <Plus />
                  Add an Category
                </Link>
              </div>
            </p>
          </div>
        ) : (
          <div className="relative overflow-x-auto shadow-lg rounded-lg bg-base-100 border border-base-300">
            <table className="w-full text-sm text-left text-base-content">
              <thead className="bg-base-300">
                <tr>
                  <th className="px-6 py-3">
                    <Tags size={20} className="inline-block mr-2" />
                    Title
                  </th>
                  <th className="px-6 py-3 text-right">
                    <PencilLine size={18} className="inline-block mr-2" />
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="bg-base-100 border-b border-base-200 hover:bg-base-200/60 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">
                      <Link
                        to={`/codes/${category._id}`}
                        className="font-medium hover:underline flex items-center gap-2"
                      >
                        <img
                          src={category.image}
                          alt=""
                          className="w-6 rounded-lg"
                        />
                        {category.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                      <button
                        className="text-info flex items-center gap-1 btn btn-ghost btn-sm"
                        onClick={() => handleEdit(category)}
                      >
                        <SquarePen size={18} />
                        Update
                      </button>
                      <button
                        className="text-error flex items-center gap-1 btn btn-ghost btn-sm"
                        onClick={() => handleDelete(category)}
                      >
                        <Trash2 size={18} className="" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editCategory && (
          <div className="modal modal-open">
            <div className="modal-box bg-base-100 border border-base-300 max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="font-bold text-lg mb-4 text-info text-center">
                Update Category
              </h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="label font-medium">Category Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editCategory.title}
                    placeholder="Enter category title"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label font-medium">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    defaultValue={editCategory.image}
                    placeholder="https://imgbb.com/image.jpg"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => setEditCategory(null)}
                    className="btn btn-ghost"
                    disabled={updating}
                  >
                    <X size={20} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary ${updating ? "loading" : ""}`}
                  >
                    <CheckCheck size={20} />
                    {updating ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>

            <div
              className="modal-backdrop bg-black/50"
              onClick={() => setEditCategory(null)}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Categories;
