import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { List, LogOut } from "lucide-react";
import { HiUserCircle } from "react-icons/hi";
import { ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut, setUser } = useAuth();
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalCodes, setTotalCodes] = useState(0);

  const fetchTotalCategories = () => {
    axiosSecure.get(`http://localhost:3000/total-categories`).then((data) => {
      setTotalCategories(data.data);
    });
  };

  const fetchTotalCodes = () => {
    axiosSecure.get(`http://localhost:3000/total-codes`).then((data) => {
      setTotalCodes(data.data);
    });
  };

  useEffect(() => {
    fetchTotalCategories();
    fetchTotalCodes();
  });

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "You are logged out successfully!",
      icon: "success",
    });
    logOut()
      .then(() => setUser(null))
      .catch((error) => {
        toast.error("Logout error: " + error.message);
      });
  };

  return (
    <>
      <title>Profile - CodeBank</title>
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
          <li aria-current="page">
            <div className="flex items-center space-x-1.5">
              <ChevronRight size={18} />
              <span className="inline-flex items-center text-sm font-medium text-body-subtle">
                Profile
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex flex-col items-center gap-8 p-6">
        <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-md p-6 text-center">
          <h1 className="mb-4">Profile</h1>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-primary shadow-md mx-auto"
              referrerPolicy="no-referrer"
            />
          ) : (
            <HiUserCircle className="text-8xl text-primary/70 mx-auto" />
          )}
          <h5 className="mt-3 text-lg font-semibold text-base-content">
            {user?.displayName || "User"}
          </h5>
          <p className="text-sm ">{user?.email || "N/A"}</p>
          <p className="mt-2">
            <span className="text-success font-bold">
              {totalCategories?.count || 0}
            </span>{" "}
            Categories |{" "}
            <span className="text-success font-bold">
              {totalCodes?.count || 0}
            </span>{" "}
            Codes
          </p>
          <div className="mt-4">
            <Link
              to="/categories"
              className="btn btn-secondary btn-block flex items-center gap-2"
            >
              <List size={16} />
              All Categories
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-error mt-4 text-white w-full flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
