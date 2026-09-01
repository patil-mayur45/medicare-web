import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import FormInput from "../components/FormInput";
import Spinner from "../components/Spinner";
import useForm from "../hooks/useForm";
import { validateSignup } from "../utils/validators";
import { signup, clearAuthError } from "../redux/slices/authSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector((state) => state.auth);

  const { values, handleChange, handleBlur, validateAll, getError } = useForm(
    { name: "", email: "", phone: "", password: "", confirmPassword: "" },
    validateSignup
  );

  useEffect(() => {
    if (user) navigate("/profile");
  }, [user, navigate]);

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const result = await dispatch(
      signup({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })
    );

    if (signup.fulfilled.match(result)) {
      toast.success("Account created! Welcome to MediCare+");
      navigate("/profile");
    } else {
      toast.error(result.payload || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="w-full max-w-md card p-8 animate-slide-up">
        <div className="flex flex-col items-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mb-3">
            <FaUserPlus size={22} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create your account</h1>
          <p className="text-sm text-gray-400 mt-1">Book appointments in minutes</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-2.5 mb-4 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Full Name"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("name")}
            placeholder="Jane Doe"
          />
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
            label="Contact Number"
            name="phone"
            type="tel"
            required
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("phone")}
            placeholder="+1 555 123 4567"
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
            placeholder="At least 6 characters"
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("confirmPassword")}
            placeholder="Re-enter your password"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
          >
            {status === "loading" && <Spinner size="sm" className="border-white/40 border-t-white" />}
            {status === "loading" ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
