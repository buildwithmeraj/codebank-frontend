import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import Error from "../../components/utilities/Error";
import Info from "../../components/utilities/Info";
import { FcGoogle } from "react-icons/fc";
import { ChevronRight } from "lucide-react";

const Login = () => {
  const { user, signInUsingGoogle, setUser, firebaseErrors } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (user && user?.email) {
    navigate("/profile");
  }

  const [error, setError] = useState(null);
  const [loginMessage, setLoginMessage] = useState(state?.message || null);
  if (state?.message && !loginMessage) {
    setLoginMessage(state?.message || null);
  }

  const handleGoogleSignIn = () => {
    signInUsingGoogle()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          title: "Login successfull!",
          text: "You are logged in successfully!",
          icon: "success",
        });
        navigate(state?.from || "/", { replace: true });
      })
      .catch((error) => {
        const match = firebaseErrors.find((err) => err.code === error.code);
        setError(match ? match.message : "Login failed. Please try again.");
      });
  };

  return (
    <>
      <title>Login - CodeBank</title>
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
                Login
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="hero min-h-[60vh]">
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-[340px] md:w-sm lg:w-md shadow-2xl">
            <div className="card-body">
              <h1>Login</h1>

              {loginMessage && <Info message={loginMessage} />}
              {error && <Error message={error} />}

              <button
                className="btn btn-outline btn-block mt-4"
                type="button"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle />
                Google Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
