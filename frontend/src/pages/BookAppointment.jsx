import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCalendarPlus, FaPaperclip, FaCheckCircle } from "react-icons/fa";
import FormInput from "../components/FormInput";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import useForm from "../hooks/useForm";
import { validateAppointment } from "../utils/validators";
import { bookAppointment, resetCreateStatus } from "../redux/slices/appointmentSlice";

const specialties = [
  "General Physician",
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Dental Care",
  "Neurology",
  "ENT",
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

export default function BookAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createStatus, createError } = useSelector((state) => state.appointments);
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { values, handleChange, handleBlur, validateAll, getError, reset } = useForm(
    { doctorType: "", date: "", time: "", comments: "" },
    validateAppointment
  );

  useEffect(() => {
    return () => dispatch(resetCreateStatus());
  }, [dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => formData.append(key, val));
    if (fileRef.current?.files[0]) formData.append("reportFile", fileRef.current.files[0]);

    const result = await dispatch(bookAppointment(formData));

    if (bookAppointment.fulfilled.match(result)) {
      setShowSuccess(true);
      reset();
      setFileName("");
      if (fileRef.current) fileRef.current.value = "";
    } else {
      toast.error(result.payload || "Could not book appointment. Please try again.");
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaCalendarPlus className="text-primary-600" /> Book an Appointment
        </h1>
        <p className="text-gray-500 text-sm mt-1">Choose your specialty, date, and preferred time slot</p>
      </div>

      <div className="card p-6 sm:p-8 max-w-2xl">
        {createError && (
          <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-2.5 mb-4 animate-fade-in">
            {createError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Doctor Specialty"
            name="doctorType"
            as="select"
            required
            value={values.doctorType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("doctorType")}
          >
            <option value="">Select a specialty</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </FormInput>

          <div className="grid sm:grid-cols-2 gap-x-4">
            <FormInput
              label="Preferred Date"
              name="date"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getError("date")}
            />
            <FormInput
              label="Preferred Time"
              name="time"
              as="select"
              required
              value={values.time}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getError("time")}
            >
              <option value="">Select a time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </FormInput>
          </div>

          <FormInput
            label="Additional Comments"
            name="comments"
            as="textarea"
            value={values.comments}
            onChange={handleChange}
            placeholder="Describe your symptoms or reason for the visit (optional)"
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Upload Report <span className="text-gray-400 font-normal">(optional, PDF or image)</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl px-4 py-6 text-center cursor-pointer hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-200"
            >
              <FaPaperclip className="mx-auto text-primary-400 mb-2" size={18} />
              <p className="text-sm text-gray-500">
                {fileName || "Click to attach a file (max 5MB)"}
              </p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            disabled={createStatus === "loading"}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {createStatus === "loading" && (
              <Spinner size="sm" className="border-white/40 border-t-white" />
            )}
            {createStatus === "loading" ? "Booking..." : "Confirm Appointment"}
          </button>
        </form>
      </div>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Appointment Booked!">
        <div className="text-center py-4">
          <FaCheckCircle className="text-green-500 mx-auto mb-4" size={48} />
          <p className="text-gray-600 mb-6">
            Your appointment request has been submitted. You can track its status anytime from
            My Appointments.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setShowSuccess(false)} className="btn-secondary">
              Book Another
            </button>
            <button
              onClick={() => navigate("/my-appointments")}
              className="btn-primary"
            >
              View My Appointments
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
