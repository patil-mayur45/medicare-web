import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaCamera, FaSave } from "react-icons/fa";
import FormInput from "../components/FormInput";
import Spinner from "../components/Spinner";
import { updateProfile } from "../redux/slices/authSlice";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "");

export default function Profile() {
  const { user, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    dob: user?.dob ? user.dob.slice(0, 10) : "",
    gender: user?.gender || "",
    address: user?.address || "",
  });
  const [preview, setPreview] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        dob: user.dob ? user.dob.slice(0, 10) : "",
        gender: user.gender || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPictureFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (pictureFile) formData.append("profilePicture", pictureFile);

    const result = await dispatch(updateProfile(formData));

    if (updateProfile.fulfilled.match(result)) {
      toast.success("Profile updated successfully");
      setPictureFile(null);
      setPreview(null);
    } else {
      toast.error(result.payload || "Could not update profile");
    }
  };

  const avatarSrc = preview
    ? preview
    : user?.profilePicture
    ? `${API_ORIGIN}${user.profilePicture}`
    : null;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal details and photo</p>
      </div>

      <div className="card p-6 sm:p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Profile"
                className="h-28 w-28 rounded-full object-cover border-4 border-primary-100"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-4xl font-bold border-4 border-primary-50">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 h-9 w-9 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors"
              aria-label="Change profile picture"
            >
              <FaCamera size={13} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePictureChange}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Click the camera icon to update your photo</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid sm:grid-cols-2 gap-x-4">
            <FormInput label="Full Name" name="name" value={form.name} onChange={handleChange} required />
            <FormInput label="Contact Number" name="phone" value={form.phone} onChange={handleChange} required />
            <FormInput label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} />
            <FormInput label="Gender" name="gender" as="select" value={form.gender} onChange={handleChange}>
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </FormInput>
          </div>
          <FormInput
            label="Address"
            name="address"
            as="textarea"
            value={form.address}
            onChange={handleChange}
            placeholder="Your address"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input value={user?.email || ""} disabled className="input-field bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary flex items-center gap-2"
          >
            {status === "loading" ? <Spinner size="sm" className="border-white/40 border-t-white" /> : <FaSave />}
            {status === "loading" ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
