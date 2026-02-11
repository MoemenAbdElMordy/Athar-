import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/d2a86183f3650ad510e5554066e364f7473a20fa.png';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-white border-b-2 border-gray-300 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group ml-16">
            <img src={logo} alt="Athar Logo" className="w-28 h-28 object-contain group-hover:scale-105 transition-all" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-all text-base relative py-2 group/link ${
                  isActive(item.href)
                    ? 'text-teal-700'
                    : 'text-gray-900 hover:text-teal-700'
                }`}
                style={{ letterSpacing: '0.01em' }}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 transition-all ${
                  isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover/link:opacity-100'
                }`}></span>
              </Link>
            ))}
            
            {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/admin/login"
              className="px-6 py-3 text-[15px] font-bold text-teal-700 hover:bg-teal-50 transition-all rounded-xl"
            >
              Admin Login
            </Link>
            <a
              href="#download"
              className="px-6 py-3 text-[15px] font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-md hover:shadow-lg rounded-xl"
            >
              Get the App
            </a>
          </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-900 hover:text-teal-700 transition-colors p-2 hover:bg-teal-50 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-8 pt-6 border-t-2 border-gray-300">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-4 px-6 transition-all rounded-lg ${
                    isActive(item.href)
                      ? 'text-teal-700 bg-teal-50 border-l-4 border-teal-700 shadow-sm'
                      : 'text-gray-900 hover:text-teal-700 hover:bg-gray-100 border-l-4 border-transparent'
                  }`}
                  style={{ fontWeight: isActive(item.href) ? 700 : 600 }}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 space-y-3">
                <Link
                  to="/admin/login"
                  className="block text-center py-4 px-6 border-2 border-teal-700 text-teal-700 hover:bg-teal-50 transition-all rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
                <a
                  href="#download"
                  className="block text-center py-4 px-6 bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-md rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get the App
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}