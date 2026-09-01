import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaCalendarCheck,
  FaUserMd,
  FaClinicMedical,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import Carousel from "../components/Carousel";
import Accordion from "../components/Accordion";

const stats = [
  { label: "Expert Doctors", value: "120+" },
  { label: "Happy Patients", value: "25K+" },
  { label: "Departments", value: "18" },
  { label: "Years of Care", value: "15+" },
];

const highlights = [
  {
    icon: <FaCalendarCheck size={22} />,
    title: "Easy Online Booking",
    desc: "Book appointments in under a minute — no phone calls, no waiting rooms.",
  },
  {
    icon: <FaUserMd size={22} />,
    title: "Verified Specialists",
    desc: "Every doctor on our platform is licensed, vetted, and highly rated by patients.",
  },
  {
    icon: <FaClinicMedical size={22} />,
    title: "Track Your Visits",
    desc: "See your appointment history and upcoming visits all in one dashboard.",
  },
];

const testimonials = [
  {
    quote: "Booking an appointment took two minutes. The reminders and the dashboard made everything effortless.",
    name: "Ananya Sharma",
    role: "Patient since 2023",
  },
  {
    quote: "I love how easy it is to upload my reports before the visit — my doctor already knows my history.",
    name: "Rohit Verma",
    role: "Patient since 2022",
  },
  {
    quote: "Clean interface, fast responses, and the sidebar makes navigating my appointments so simple.",
    name: "Priya Nair",
    role: "Patient since 2024",
  },
];

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Create an account, click 'Book an Appointment', choose your specialty, preferred date and time, and submit. You'll see it instantly in 'My Appointments'.",
  },
  {
    question: "Can I upload medical reports before my visit?",
    answer:
      "Yes — while booking, you can attach an image or PDF of your reports so your doctor can review them in advance.",
  },
  {
    question: "How do I cancel or reschedule?",
    answer:
      "Go to 'My Appointments', find the visit, and use the cancel option. Rescheduling can be done by booking a new slot.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your account is protected with encrypted authentication, and reports are stored securely and only accessible to you and your care team.",
  },
];

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {/* Hero / Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Trusted healthcare, simplified
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Your health,
              <span className="text-primary-600"> booked in minutes.</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-lg">
              Find the right specialist, book an appointment, and manage every visit —
              all from one clean, simple dashboard.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={user ? "/book-appointment" : "/signup"}
                className="btn-primary flex items-center gap-2 text-base px-6 py-3"
              >
                Book an Appointment <FaArrowRight size={14} />
              </Link>
              <Link to="/services" className="btn-secondary text-base px-6 py-3">
                Explore Services
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-primary-700">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-400 to-accent-500 p-1.5 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-[1.4rem] h-full w-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                  alt="Doctor consulting with a patient"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-slide-up">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <FaCheckCircle />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Appointment Confirmed</p>
                <p className="text-xs text-gray-400">Dr. Patel · Cardiology</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why choose MediCare+</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything you need to manage your healthcare journey, in one friendly place.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <div key={i} className="card p-7 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                {h.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{h.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary-50/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What our patients say</h2>
          </div>
          <Carousel slides={testimonials} />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
        </div>
        <Accordion items={faqs} />
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-primary-600 to-accent-600 px-8 py-14 text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to take control of your health?
          </h2>
          <p className="text-primary-100 mb-7 max-w-lg mx-auto">
            Join thousands of patients who book, track, and manage their care with MediCare+.
          </p>
          <Link
            to={user ? "/book-appointment" : "/signup"}
            className="inline-block bg-white text-primary-700 font-semibold px-7 py-3 rounded-xl hover:bg-primary-50 transition-all duration-200 active:scale-95 shadow-md"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
