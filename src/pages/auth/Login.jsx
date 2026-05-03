import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/useAuth";
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

  useEffect(() => {
    if (user?.email) {
      navigate("/profile");
    }
  }, [navigate, user]);

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
      <div className="page-shell">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
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
        <div className="hero min-h-[56vh]">
          <div className="hero-content flex-col">
            <div className="card bg-base-200 max-w-[340px] md:max-w-sm lg:max-w-md shadow-2xl">
              <div className="card-body">
                <h1 className="heading-title">Login</h1>

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
      </div>
    </>
  );
};

export default Login;
