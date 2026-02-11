import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t-2 border-gray-300 mt-32 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-teal-700 mb-4 font-bold">About Athar</h3>
            <p className="text-gray-900 text-[16px] leading-relaxed">
              Empowering people of determination through accessibility and community support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-teal-700 mb-4 font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-900 text-[16px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-900 text-[16px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-900 text-[16px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-teal-700 mb-4 font-bold">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tutorials" className="text-gray-900 text-[16px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-900 text-[16px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-900 text-[16px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-teal-700 mb-4 font-bold">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-900 text-[16px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-900 text-[16px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-900 text-[16px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  Accessibility Statement
                </a>
              </li>
              <li>
                <Link to="/admin/login" className="text-slate-400 text-[14px] font-semibold hover:text-teal-700 hover:underline underline-offset-2 decoration-2 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-gray-300">
          <p className="text-gray-900 text-center text-[16px] font-semibold">
            © {new Date().getFullYear()} Athar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}