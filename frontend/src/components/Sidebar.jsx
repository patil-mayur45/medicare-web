import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaCalendarPlus, FaCalendarCheck, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { closeSidebar } from "../redux/slices/uiSlice";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "");

export default function Sidebar() {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-primary-600 text-white shadow-sm"
        : "text-gray-600 hover:bg-primary-50 hover:text-primary-700"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <span className="font-semibold text-gray-700">Menu</span>
        <button onClick={() => dispatch(closeSidebar())} className="p-2 text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>

      <div className="flex flex-col items-center text-center mb-8 pb-6 border-b border-gray-100">
        {user?.profilePicture ? (
          <img
            src={`${API_ORIGIN}${user.profilePicture}`}
            alt={user.name}
            className="h-20 w-20 rounded-full object-cover border-4 border-primary-100 mb-3"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold mb-3">
            {user?.name?.[0]?.toUpperCase()}
          </div>
        )}
        <h3 className="font-semibold text-gray-800">{user?.name}</h3>
        <p className="text-xs text-gray-400">{user?.email}</p>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        <NavLink to="/profile" className={linkClass} onClick={() => dispatch(closeSidebar())}>
          <FaUser /> Patient Profile
        </NavLink>
        <NavLink to="/book-appointment" className={linkClass} onClick={() => dispatch(closeSidebar())}>
          <FaCalendarPlus /> Book an Appointment
        </NavLink>
        <NavLink to="/my-appointments" className={linkClass} onClick={() => dispatch(closeSidebar())}>
          <FaCalendarCheck /> My Appointments
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-200 mt-4"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
        {content}
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => dispatch(closeSidebar())}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white p-6 shadow-2xl animate-slide-in-left">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
