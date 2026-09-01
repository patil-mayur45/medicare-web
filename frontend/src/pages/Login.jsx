import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaHeartbeat } from "react-icons/fa";
import FormInput from "../components/FormInput";
import Spinner from "../components/Spinner";
import useForm from "../hooks/useForm";
import { validateLogin } from "../utils/validators";
import { login, clearAuthError } from "../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error, user } = useSelector((state) => state.auth);

  const { values, handleChange, handleBlur, validateAll, getError } = useForm(
    { email: "", password: "" },
    validateLogin
  );

  useEffect(() => {
    if (user) navigate(location.state?.from?.pathname || "/profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const result = await dispatch(login(values));

    if (login.fulfilled.match(result)) {
      toast.success(`Welcome back, ${result.payload.user.name.split(" ")[0]}!`);
      navigate(location.state?.from?.pathname || "/profile");
    } else {
      toast.error(result.payload || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="w-full max-w-md card p-8 animate-slide-up">
        <div className="flex flex-col items-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mb-3">
            <FaHeartbeat size={22} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-1">Log in to manage your appointments</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-2.5 mb-4 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("email")}
            placeholder="jane@example.com"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            required
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("password")}
            placeholder="Your password"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
          >
            {status === "loading" && <Spinner size="sm" className="border-white/40 border-t-white" />}
            {status === "loading" ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
