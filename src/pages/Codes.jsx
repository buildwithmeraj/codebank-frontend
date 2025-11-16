import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import toast from "react-hot-toast";
import Loading from "../components/utilities/Loading";
import {
  TriangleAlert,
  Plus,
  ChevronRight,
  Tags,
  PencilLine,
  FileCode,
  Trash2,
  SquarePen,
  X,
  CheckCheck,
} from "lucide-react";
import Swal from "sweetalert2";

const Codes = () => {
  const { id } = useParams();
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCode, setEditCode] = useState(null);
  const [updating, setUpdating] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Fetch codes for this category
  const fetchCodes = async () => {
    console.log("Category ID:", id);
    console.log("Full URL:", `/codes/${id}`);

    try {
      const response = await axiosSecure.get(`/codes/${id}`);
      setCodes(response.data);
    } catch (error) {
      console.error("Full error:", error.response || error);
      toast.error("Failed to fetch codes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, [id]);

  const handleDelete = async (code) => {
    const result = await Swal.fire({
      title: "Code",
      text: `Do you want to delete ${code.title}?`,
      showCancelButton: true,
      confirmButtonText: `<span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2 inline-block"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Delete</span>`,
      cancelButtonText: `<span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Cancel</span>`,
      confirmButtonColor: "red",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/codes/${code._id}`);
        Swal.fire({
          title: "Code",
          text: `Deleted "${code.title}" successfully.`,
          icon: "success",
        });
        setCodes((prev) => prev.filter((i) => i._id !== code._id));
      } catch (error) {
        toast.error("Failed to delete code: " + error.message);
      }
    }
  };

  const handleEdit = (code) => setEditCode(code);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const formData = {
      title: form.title.value.trim(),
      code: form.code.value.trim(),
    };

    if (!formData.title || !formData.code) {
      toast.error("Please fill in all required fields.");
      setUpdating(false);
      return;
    }

    try {
      await axiosSecure.patch(`/codes/${editCode._id}`, formData);
      toast.success("Code updated!");
      setEditCode(null);
      fetchCodes();
    } catch (error) {
      toast.error("Failed to update code: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading />;

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
                Codes
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="px-2 md:px-4 lg:px-8">
        <title>My Codes - CityFix</title>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            My Codes
            {codes.length > 0 && ` (${codes.length})`}
          </h2>

          <Link to={`/add-code/${id}`} className="btn btn-success text-white">
            <Plus size={20} />
            Add Code
          </Link>
        </div>

        {codes.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-6 text-center max-w-md">
              <TriangleAlert size={70} className="text-gray-500 mx-auto" />
              <p className="text-2xl text-base-content/70 mt-4">
                You don't have any codes.
              </p>
              <div className="mt-4">
                <Link className="btn btn-success" to={`/add-code/${id}`}>
                  <Plus /> Add a Code
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Table
          <div className="overflow-x-auto shadow-lg sm:rounded-lg bg-base-100 border border-base-300">
            <table className="w-full text-sm text-left text-base-content">
              <thead className="text-xs uppercase bg-base-200 text-base-content/80">
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
                {codes.map((code) => (
                  <tr
                    key={code._id}
                    className="border-b border-base-200 hover:bg-base-200/60 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      <Link
                        to={`/view-code/${code._id}`}
                        className="font-medium hover:underline flex items-center gap-2"
                      >
                        <FileCode size={18} className="inline-block" />
                        {code.title}
                      </Link>
                    </td>

                    <td className="px-6 py-4 flex justify-end gap-3">
                      <button
                        className="text-info flex items-center gap-1 btn btn-ghost btn-sm"
                        onClick={() => handleEdit(code)}
                      >
                        <SquarePen size={18} />
                        Update
                      </button>
                      <button
                        className="text-error flex items-center gap-1 btn btn-ghost btn-sm"
                        onClick={() => handleDelete(code)}
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

        {editCode && (
          <div className="modal modal-open">
            <div className="modal-box max-w-xl max-h-[90vh] overflow-y-auto bg-base-100 border border-base-300">
              <h3 className="font-bold text-lg text-info text-center mb-4">
                Update Code
              </h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="label font-medium">Code Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editCode.title}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-medium"> Code</label>
                  <textarea
                    name="code"
                    rows="4"
                    className="textarea textarea-bordered w-full"
                    placeholder="Write your code here..."
                    defaultValue={editCode.code}
                  ></textarea>
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setEditCode(null)}
                    disabled={updating}
                  >
                    <X size={20} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className={`btn btn-primary ${updating ? "loading" : ""}`}
                  >
                    {" "}
                    <CheckCheck size={20} />
                    {updating ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>

            <div
              className="modal-backdrop bg-black/50"
              onClick={() => setEditCode(null)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Codes;
