import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCalendarCheck, FaCalendarPlus, FaClock, FaStethoscope, FaFileMedical, FaTimes } from "react-icons/fa";
import GridSkeleton from "../components/skeletons/GridSkeleton";
import AppointmentCardSkeleton from "../components/skeletons/AppointmentCardSkeleton";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { fetchMyAppointments, cancelAppointment } from "../redux/slices/appointmentSlice";

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-gray-100 text-gray-500 border-gray-200",
};

export default function MyAppointments() {
  const dispatch = useDispatch();
  const { items, listStatus, listError } = useSelector((state) => state.appointments);
  const [yearFilter, setYearFilter] = useState("all");
  const [cancellingId, setCancellingId] = useState(null);

  const load = () => dispatch(fetchMyAppointments());

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const years = useMemo(() => {
    const set = new Set(items.map((a) => new Date(a.date).getFullYear()));
    return Array.from(set).sort((a, b) => b - a);
  }, [items]);

  const filtered = useMemo(() => {
    if (yearFilter === "all") return items;
    return items.filter((a) => new Date(a.date).getFullYear() === Number(yearFilter));
  }, [items, yearFilter]);

  const handleCancel = async (id) => {
    setCancellingId(id);
    const result = await dispatch(cancelAppointment(id));
    setCancellingId(null);
    if (cancelAppointment.fulfilled.match(result)) {
      toast.success("Appointment cancelled");
    } else {
      toast.error(result.payload || "Could not cancel appointment");
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaCalendarCheck className="text-primary-600" /> My Appointments
          </h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your upcoming and past visits</p>
        </div>

        {items.length > 0 && (
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="input-field w-auto text-sm"
          >
            <option value="all">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        )}
      </div>

      {listStatus === "loading" && (
        <GridSkeleton
          Component={AppointmentCardSkeleton}
          count={4}
          className="grid sm:grid-cols-2 gap-5"
        />
      )}

      {listStatus === "failed" && <ErrorState message={listError} onRetry={load} />}

      {listStatus === "succeeded" && filtered.length === 0 && (
        <EmptyState
          icon={<FaCalendarCheck size={28} />}
          title={items.length === 0 ? "No appointments yet" : "No appointments in this year"}
          message={
            items.length === 0
              ? "You haven't booked any appointments. Book your first visit to get started."
              : "Try selecting a different year filter."
          }
          action={
            items.length === 0 && (
              <Link to="/book-appointment" className="btn-primary flex items-center gap-2">
                <FaCalendarPlus /> Book an Appointment
              </Link>
            )
          }
        />
      )}

      {listStatus === "succeeded" && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((a, i) => (
            <div
              key={a._id}
              className="card p-5 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-primary-700 font-semibold">
                  <FaStethoscope size={14} /> {a.doctorType}
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${statusStyles[a.status]}`}
                >
                  {a.status}
                </span>
              </div>

              <div className="text-sm text-gray-500 space-y-1.5">
                <p>
                  {new Date(a.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="flex items-center gap-1.5">
                  <FaClock size={12} /> {a.time}
                </p>
                {a.comments && <p className="text-gray-400 italic line-clamp-2">"{a.comments}"</p>}
                {a.reportFile && (
                  <p className="flex items-center gap-1.5 text-primary-500">
                    <FaFileMedical size={12} /> Report attached
                  </p>
                )}
              </div>

              {a.status !== "cancelled" && a.status !== "completed" && (
                <button
                  onClick={() => handleCancel(a._id)}
                  disabled={cancellingId === a._id}
                  className="mt-4 text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <FaTimes size={10} />
                  {cancellingId === a._id ? "Cancelling..." : "Cancel Appointment"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
