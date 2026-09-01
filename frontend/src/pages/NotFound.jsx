import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <FaHeartBroken className="text-primary-300 mb-4" size={56} />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
