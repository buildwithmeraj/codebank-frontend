import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate, useParams, Link } from "react-router";
import Loading from "../components/utilities/Loading";
import { TriangleAlert, Plus, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import Error from "../components/utilities/Error";

const AddCode = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get(`/category/${categoryId}`);
      setCodes(response.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Category not found.");
        } else if (error.response.status === 403) {
          toast.error("You are not authorized to view this category.");
        } else {
          toast.error(
            "Failed to fetch the category: " + error.response.data.message
          );
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      navigate(`/categories/`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const code = e.target.code.value.trim();

    if (!title || !code) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = {
      title,
      code,
      categoryId,
    };

    try {
      await axiosSecure.post(`/codes/${categoryId}`, formData);
      Swal.fire({
        title: "Code",
        text: `Code added successfully.`,
        icon: "success",
      });
      e.target.reset();
      navigate(`/codes/${categoryId}`);
    } catch (error) {
      console.error("Error adding code:", error);
      setError("Failed to add code. Please try again.");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <title>Add Code - CodeBank</title>
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
          <li className="inline-flex items-center">
            <ChevronRight size={18} />
            <Link
              to={`/codes/${categoryId}`}
              className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
            >
              Codes
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center space-x-1.5">
              <ChevronRight size={18} />
              <span className="inline-flex items-center text-sm font-medium text-body-subtle">
                Add Code
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
        <h1 className="text-2xl font-semibold">Add a New Code</h1>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-medium">Code Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter code title"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label font-medium"> Code</label>
            <textarea
              name="code"
              rows="8"
              className="textarea textarea-bordered w-full"
              placeholder="Write your code here..."
            ></textarea>
          </div>

          <input type="hidden" name="categoryId" value={categoryId} />

          <button type="submit" className="btn btn-primary w-full">
            <Plus size={20} />
            Add Code
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCode;
