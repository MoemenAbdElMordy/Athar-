import { Download, Heart, Users, MapPin, BookOpen, Compass, Link as LinkIcon, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import AccessibilityMappingAppMvp from '../imports/AccessibilityMappingAppMvp';
import appScreenshot from 'figma:asset/867383944f5c71c33307d290247e80bee73b0125.png';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-teal-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-gray-900 mb-6">
                Empowering accessibility for everyone
              </h1>
              <p className="text-gray-900 mb-10 max-w-xl" style={{ fontSize: '20px', lineHeight: '1.7' }}>
                Athar connects people of determination with accessible spaces and compassionate volunteers, making every journey inclusive and independent.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">
                  <Download className="inline mr-2" size={20} />
                  Download Athar App
                </Button>
                <Link to="/volunteer">
                  <Button variant="secondary">
                    <Heart className="inline mr-2" size={20} />
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-auto">
                <img 
                  src={appScreenshot} 
                  alt="Athar mobile app showing map with accessible places nearby" 
                  className="w-full h-auto rounded-3xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Intro Section */}
      <section className="bg-teal-50 py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-gray-900 mb-6">
            Building a more accessible world
          </h2>
          <p className="text-gray-900" style={{ fontSize: '20px', lineHeight: '1.7' }}>
            Athar is dedicated to breaking down barriers and creating inclusive environments. We believe everyone deserves the freedom to explore, learn, and connect — regardless of their abilities. Through technology and community, we're making accessibility a reality, not an afterthought.
          </p>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* For Who Section */}
      <section className="bg-teal-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-gray-900 mb-16 text-center">
            Who is Athar for?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Column 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                  <Users className="text-white" size={40} />
                </div>
              </div>
              <h3 className="text-gray-900 mb-4">
                People of Determination
              </h3>
              <p className="text-gray-900" style={{ lineHeight: '1.7' }}>
                Navigate the world with confidence. Access detailed information about accessible spaces and connect with volunteers when you need assistance.
              </p>
            </div>

            {/* Column 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                  <Heart className="text-white" size={40} />
                </div>
              </div>
              <h3 className="text-gray-900 mb-4">
                Volunteers & Companions
              </h3>
              <p className="text-gray-900" style={{ lineHeight: '1.7' }}>
                Make a meaningful difference in your community. Offer support, guidance, and companionship to those who need it most.
              </p>
            </div>

            {/* Column 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                  <MapPin className="text-white" size={40} />
                </div>
              </div>
              <h3 className="text-gray-900 mb-4">
                Businesses & Organizations
              </h3>
              <p className="text-gray-900" style={{ lineHeight: '1.7' }}>
                Showcase your commitment to accessibility. Help us build a comprehensive directory of accessible locations and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* How Athar Works Section */}
      <section className="bg-teal-50 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-gray-900 mb-6">
            How Athar works
          </h2>
          <p className="text-gray-900 mb-16 max-w-2xl" style={{ fontSize: '20px', lineHeight: '1.7' }}>
            Athar provides a comprehensive ecosystem of accessibility resources and community support.
          </p>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                  <BookOpen className="text-white" size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Learn accessibility
                </h3>
                <p className="text-gray-900" style={{ lineHeight: '1.7' }}>
                  Access comprehensive tutorials and guides about accessibility, assistive technologies, and inclusive practices. Our educational resources help both users and volunteers understand accessibility needs better.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                  <Compass className="text-white" size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Explore accessible places
                </h3>
                <p className="text-gray-900 mb-3" style={{ lineHeight: '1.7' }}>
                  Discover restaurants, shops, parks, and public spaces with detailed accessibility information. Filter by specific needs and read reviews from the community.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-700 px-4 py-3 shadow-sm">
                  <p className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                    Available in the Athar mobile application
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                  <LinkIcon className="text-white" size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Connect with volunteers
                </h3>
                <p className="text-gray-900 mb-3" style={{ lineHeight: '1.7' }}>
                  Request assistance from trained volunteers in your area. Whether you need a companion for shopping, help navigating public transport, or support at events, our community is here for you.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-700 px-4 py-3 shadow-sm">
                  <p className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                    Available in the Athar mobile application
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                  <Navigation className="text-white" size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Move safely
                </h3>
                <p className="text-gray-900" style={{ lineHeight: '1.7' }}>
                  Plan your journeys with confidence using our accessibility-focused navigation and real-time updates. Know what to expect before you arrive, ensuring every trip is smooth and stress-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* Tutorials Teaser */}
      <section className="bg-teal-50 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-gray-900 mb-6">
            Learn with our tutorials
          </h2>
          <p className="text-gray-900 mb-12" style={{ fontSize: '20px', lineHeight: '1.7' }}>
            Comprehensive guides to help you make the most of accessibility resources and support others in your community.
          </p>

          <ul className="space-y-4">
            <li style={{ fontSize: '18px', lineHeight: '1.7' }}>
              <Link to="/tutorials#getting-started" className="text-teal-700 hover:text-orange-600 transition-colors underline decoration-2" style={{ fontWeight: 600 }}>
                Getting started with Athar
              </Link>
              <span className="text-gray-900"> — Learn the basics of using the platform</span>
            </li>
            <li style={{ fontSize: '18px', lineHeight: '1.7' }}>
              <Link to="/tutorials#accessibility-features" className="text-teal-700 hover:text-orange-600 transition-colors underline decoration-2" style={{ fontWeight: 600 }}>
                Understanding accessibility features
              </Link>
              <span className="text-gray-900"> — Discover what makes a space truly accessible</span>
            </li>
            <li style={{ fontSize: '18px', lineHeight: '1.7' }}>
              <Link to="/tutorials#effective-volunteer" className="text-teal-700 hover:text-orange-600 transition-colors underline decoration-2" style={{ fontWeight: 600 }}>
                How to be an effective volunteer
              </Link>
              <span className="text-gray-900"> — Best practices for supporting people of determination</span>
            </li>
            <li style={{ fontSize: '18px', lineHeight: '1.7' }}>
              <Link to="/tutorials#assistive-technologies" className="text-teal-700 hover:text-orange-600 transition-colors underline decoration-2" style={{ fontWeight: 600 }}>
                Navigating with assistive technologies
              </Link>
              <span className="text-gray-900"> — Tips for using Athar with screen readers and other tools</span>
            </li>
          </ul>

          <div className="mt-10">
            <Link to="/tutorials" className="text-teal-700 hover:text-orange-600 inline-flex items-center gap-2 transition-colors underline decoration-2" style={{ fontSize: '18px', fontWeight: 600 }}>
              View all tutorials →
            </Link>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* App Promotion Section */}
      <section className="bg-teal-50 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <img 
              src={appScreenshot} 
              alt="Athar mobile app showing map with accessible places nearby" 
              className="w-64 h-auto rounded-3xl shadow-lg"
            />
          </div>
          <p className="text-gray-900" style={{ fontSize: '18px', lineHeight: '1.7' }}>
            All operational features are available inside the Athar mobile application.
          </p>
        </div>
      </section>
    </div>
  );
}