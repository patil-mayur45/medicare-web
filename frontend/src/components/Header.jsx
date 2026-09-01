import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaUserCircle, FaTimes } from "react-icons/fa";
import { logout } from "../redux/slices/authSlice";
import { toggleSidebar } from "../redux/slices/uiSlice";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-primary-700 bg-primary-50" : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {user && (
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                aria-label="Toggle sidebar"
              >
                <FaBars size={18} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                M
              </div>
              <span className="font-bold text-lg text-primary-800 tracking-tight">MediCare+</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            {user && (
              <>
                <NavLink to="/book-appointment" className={navLinkClass}>
                  Book an Appointment
                </NavLink>
                <NavLink to="/my-appointments" className={navLinkClass}>
                  My Appointments
                </NavLink>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {user.profilePicture ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000"}${user.profilePicture}`}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover border-2 border-primary-200"
                    />
                  ) : (
                    <FaUserCircle size={26} className="text-primary-400" />
                  )}
                  <span>{user.name?.split(" ")[0]}</span>
                </Link>
                <button onClick={handleLogout} className="btn-danger text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            )}
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-primary-50"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 animate-slide-up">
            <NavLink to="/" end className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/services" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
              Services
            </NavLink>
            {user ? (
              <>
                <NavLink to="/book-appointment" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                  Book an Appointment
                </NavLink>
                <NavLink to="/my-appointments" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                  My Appointments
                </NavLink>
                <NavLink to="/profile" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                  My Profile
                </NavLink>
                <button onClick={handleLogout} className="btn-danger text-sm mt-2 mx-3">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 mt-2 px-3">
                <Link to="/login" className="btn-secondary text-sm flex-1 text-center" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm flex-1 text-center" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
