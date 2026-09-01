import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { FaClinicMedical, FaArrowRight } from "react-icons/fa";
import GridSkeleton from "../components/skeletons/GridSkeleton";
import CardSkeleton from "../components/skeletons/CardSkeleton";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { fetchServices } from "../redux/slices/serviceSlice";

export default function Services() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.services);

  const load = () => dispatch(fetchServices());

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Our Services</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          From routine checkups to specialist care, explore everything we offer.
        </p>
      </div>

      {status === "loading" && (
        <GridSkeleton
          Component={CardSkeleton}
          count={6}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        />
      )}

      {status === "failed" && <ErrorState message={error} onRetry={load} />}

      {status === "succeeded" && items.length === 0 && (
        <EmptyState
          icon={<FaClinicMedical size={28} />}
          title="No services available"
          message="Please check back later."
        />
      )}

      {status === "succeeded" && items.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.FaStethoscope;
            return (
              <div
                key={s._id}
                className="card p-6 animate-slide-up group"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.description}</p>
                <Link
                  to="/book-appointment"
                  className="text-primary-600 text-sm font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200"
                >
                  Book Now <FaArrowRight size={11} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
