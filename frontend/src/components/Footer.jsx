import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="font-bold text-lg text-white">MediCare+</span>
            </div>
            <p className="text-sm text-primary-200 leading-relaxed">
              Compassionate care, seamless booking. Your health, our priority — anytime, anywhere.
            </p>
            <div className="flex gap-3 mt-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-primary-800 hover:bg-primary-600 transition-colors duration-200"
                  aria-label="social link"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/book-appointment" className="hover:text-white transition-colors">Book an Appointment</Link></li>
              <li><Link to="/my-appointments" className="hover:text-white transition-colors">My Appointments</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Departments</h4>
            <ul className="space-y-2 text-sm">
              <li>Cardiology</li>
              <li>Pediatrics</li>
              <li>Dermatology</li>
              <li>Orthopedics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Wellness Ave, Health City</li>
              <li className="flex items-center gap-2"><FaPhone /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><FaEnvelope /> care@medicareplus.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-10 pt-6 text-center text-sm text-primary-300">
          © {new Date().getFullYear()} MediCare+. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
