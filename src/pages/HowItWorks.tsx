import { Smartphone, Search, Users, MapPin, Star, MessageSquare, Bell } from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="bg-teal-50">
      {/* Hero Title */}
      <section className="py-32 bg-teal-50 border-b-4 border-teal-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="border-l-4 border-teal-700 pl-8">
            <h1 className="text-gray-900 mb-6">
              How Athar works
            </h1>
            <p className="text-gray-900 max-w-3xl" style={{ fontSize: '20px', lineHeight: '1.7' }}>
              Athar combines accessibility information, community support, and educational resources to empower people of determination. Here's how our platform helps you navigate the world with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* Getting Started */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-gray-900 mb-12">
            Getting started with Athar
          </h2>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-teal-600 text-white flex items-center justify-center" style={{ fontWeight: 700, fontSize: '20px' }}>
                  1
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Download the Athar app
                </h3>
                <p className="text-gray-700 mb-4" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                  Available on iOS and Android, the Athar mobile app is your gateway to accessibility information and community support. Create a free account to get started.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-600 px-4 py-3">
                  <p className="text-teal-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                    The mobile app is required for core features like finding accessible places and connecting with volunteers
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-teal-600 text-white flex items-center justify-center" style={{ fontWeight: 700, fontSize: '20px' }}>
                  2
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Set up your profile
                </h3>
                <p className="text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                  Tell us about your accessibility needs and preferences. This helps us provide relevant information and match you with appropriate volunteers when needed. Your privacy is protected — share only what you're comfortable with.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-teal-600 text-white flex items-center justify-center" style={{ fontWeight: 700, fontSize: '20px' }}>
                  3
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Explore tutorials and resources
                </h3>
                <p className="text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                  Browse our comprehensive learning resources on this website. From understanding accessibility features to tips for using assistive technologies, we provide guidance for all experience levels.
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

      {/* Finding Accessible Places */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <Search className="text-teal-600" size={24} />
                </div>
                <h2 className="text-gray-900">
                  Finding accessible places
                </h2>
              </div>
              <p className="text-gray-700 mb-6" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                Search for restaurants, shops, parks, healthcare facilities, and more based on your specific accessibility needs. Our database includes detailed information verified by our community.
              </p>
              <div className="bg-teal-50 border-l-4 border-teal-600 px-4 py-3">
                <p className="text-teal-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                  Available in the Athar mobile application
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-80 bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl flex items-center justify-center border border-teal-200">
                <span className="text-teal-600" style={{ fontWeight: 600 }}>Search Interface</span>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <MapPin className="text-teal-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Detailed accessibility information
                </h3>
                <p className="text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                  Each location profile includes entrance accessibility, parking availability, restroom facilities, seating options, noise levels, lighting conditions, and more. Filter by what matters most to you.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <Star className="text-teal-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Community reviews and ratings
                </h3>
                <p className="text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                  Read experiences from other users with similar needs. Add your own reviews to help others in the community make informed decisions about where to go.
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

      {/* Connecting with Volunteers */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
              <Users className="text-teal-600" size={24} />
            </div>
            <h2 className="text-gray-900">
              Connecting with volunteers
            </h2>
          </div>

          <p className="text-gray-700 mb-12" style={{ fontSize: '18px', lineHeight: '1.75' }}>
            Sometimes you need more than information — you need a helping hand. Athar's volunteer network is here to provide companionship and support when you need it.
          </p>

          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-orange-600 text-white flex items-center justify-center" style={{ fontWeight: 700, fontSize: '20px' }}>
                  1
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Request assistance
                </h3>
                <p className="text-gray-700 mb-4" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                  In the app, describe what kind of support you need — whether it's help navigating a new area, companionship for shopping, or assistance at a medical appointment.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-600 px-4 py-3">
                  <p className="text-teal-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                    Available in the Athar mobile application
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-orange-600 text-white flex items-center justify-center" style={{ fontWeight: 700, fontSize: '20px' }}>
                  2
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Get matched with a volunteer
                </h3>
                <p className="text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                  Our system matches you with available volunteers in your area who have the right skills and availability. View their profiles and choose who you'd like to work with.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-orange-600 text-white flex items-center justify-center" style={{ fontWeight: 700, fontSize: '20px' }}>
                  3
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Connect and coordinate
                </h3>
                <p className="text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                  Message your volunteer through the app to finalize details. Meet at the agreed time and location. All interactions are logged for safety and quality assurance.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <MessageSquare className="text-teal-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">
                  Provide feedback
                </h3>
                <p className="text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                  After your interaction, rate your experience and provide feedback. This helps us maintain quality and helps other users make informed choices.
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

      {/* Learning Resources */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
              <Smartphone className="text-teal-600" size={24} />
            </div>
            <h2 className="text-gray-900">
              Learning and growing together
            </h2>
          </div>

          <p className="text-gray-700 mb-12" style={{ fontSize: '18px', lineHeight: '1.75' }}>
            Athar is more than a tool — it's an educational platform. We provide resources to help everyone understand accessibility better.
          </p>

          <div className="space-y-8 text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
            <p>
              <strong className="text-gray-900" style={{ fontWeight: 600 }}>For people of determination:</strong> Learn about your rights, discover new assistive technologies, and get tips for advocating for your needs in different environments.
            </p>
            <p>
              <strong className="text-gray-900" style={{ fontWeight: 600 }}>For volunteers:</strong> Access training materials on disability etiquette, communication strategies, and practical support techniques. Understand how to be truly helpful without being patronizing.
            </p>
            <p>
              <strong className="text-gray-900" style={{ fontWeight: 600 }}>For everyone:</strong> Browse our tutorials on this website to learn about different types of accessibility needs, universal design principles, and how to create more inclusive communities.
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* Staying Informed */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
              <Bell className="text-teal-600" size={24} />
            </div>
            <h2 className="text-gray-900">
              Staying informed
            </h2>
          </div>

          <p className="text-gray-700 mb-8" style={{ fontSize: '18px', lineHeight: '1.75' }}>
            Enable notifications in the app to receive:
          </p>

          <ul className="space-y-4 text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
            <li className="flex gap-3">
              <span className="text-teal-600 flex-shrink-0" style={{ fontWeight: 700 }}>•</span>
              <span>Updates when new accessible locations are added in your area</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-600 flex-shrink-0" style={{ fontWeight: 700 }}>•</span>
              <span>Volunteer responses to your support requests</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-600 flex-shrink-0" style={{ fontWeight: 700 }}>•</span>
              <span>Changes to accessibility features at your saved locations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-600 flex-shrink-0" style={{ fontWeight: 700 }}>•</span>
              <span>New tutorials and resources relevant to your interests</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-600 flex-shrink-0" style={{ fontWeight: 700 }}>•</span>
              <span>Community events and accessibility initiatives in your city</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}