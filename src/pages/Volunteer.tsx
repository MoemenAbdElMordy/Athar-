import { Heart, Check } from 'lucide-react';
import { useState } from 'react';

export function Volunteer() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    availability: '',
    experience: '',
    motivation: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a server
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="bg-teal-50">
        <section className="py-24 bg-teal-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-lime-600" size={40} />
              </div>
              <h1 className="text-gray-900 mb-6">
                Thank you for your interest!
              </h1>
              <p className="text-gray-700 mb-8" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                We've received your volunteer application. Our team will review your information and contact you within 3-5 business days with next steps.
              </p>
              <p className="text-gray-700" style={{ fontSize: '18px', lineHeight: '1.75' }}>
                In the meantime, you can learn more about volunteering with Athar by visiting our tutorials page.
              </p>
              <div className="mt-10">
                <a
                  href="/tutorials"
                  className="px-8 py-4 bg-teal-600 text-white hover:bg-teal-700 transition-colors inline-block shadow-sm hover:shadow-md"
                  style={{ fontWeight: 600 }}
                >
                  View Volunteer Tutorials
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-teal-50">
      {/* Hero Title */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
              <Heart className="text-teal-600" size={28} />
            </div>
            <h1 className="text-gray-900">
              Become a volunteer
            </h1>
          </div>
          <p className="text-gray-700 max-w-3xl" style={{ fontSize: '20px', lineHeight: '1.7' }}>
            Join our community of compassionate volunteers making a real difference in people's lives. Help create a more accessible and inclusive world by offering your time and support to people of determination.
          </p>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Main Content Section */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <div className="mb-10">
                <h2 className="text-gray-900 mb-3">
                  Volunteer application
                </h2>
                <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: '1.7' }}>
                  Complete the form below to start your journey as an Athar volunteer. All fields marked with * are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="pb-2 border-b-2 border-gray-200">
                    <h3 className="text-gray-900" style={{ fontSize: '20px', fontWeight: 600 }}>
                      Personal information
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                        First name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all bg-white"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                        Last name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all bg-white"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-6">
                  <div className="pb-2 border-b-2 border-gray-200">
                    <h3 className="text-gray-900" style={{ fontSize: '20px', fontWeight: 600 }}>
                      Contact details
                    </h3>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                      Email address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all bg-white"
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+971 50 123 4567"
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all bg-white"
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                      City / Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="Dubai, Abu Dhabi, etc."
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all bg-white"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>

                {/* Availability Section */}
                <div className="space-y-6">
                  <div className="pb-2 border-b-2 border-gray-200">
                    <h3 className="text-gray-900" style={{ fontSize: '20px', fontWeight: 600 }}>
                      Availability
                    </h3>
                  </div>

                  <div>
                    <label htmlFor="availability" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                      When can you volunteer? *
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all appearance-none bg-white cursor-pointer"
                      style={{ fontSize: '16px', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%230D9488\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1.25rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '3rem' }}
                    >
                      <option value="">Select your availability</option>
                      <option value="weekdays">Weekdays only</option>
                      <option value="weekends">Weekends only</option>
                      <option value="both">Both weekdays and weekends</option>
                      <option value="flexible">Flexible schedule</option>
                    </select>
                    <p className="text-gray-600 mt-2" style={{ fontSize: '14px' }}>
                      We'll match you with opportunities that fit your schedule
                    </p>
                  </div>
                </div>

                {/* About You Section */}
                <div className="space-y-6">
                  <div className="pb-2 border-b-2 border-gray-200">
                    <h3 className="text-gray-900" style={{ fontSize: '20px', fontWeight: 600 }}>
                      About you
                    </h3>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                      Previous experience (optional)
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about any experience you have working with people of determination, volunteering, or accessibility-related work. This is optional but helps us understand your background."
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all resize-none bg-white"
                      style={{ fontSize: '16px', lineHeight: '1.6' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="motivation" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                      Why do you want to volunteer with Athar? *
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Share what motivates you to support people of determination and how you hope to contribute to our community. We'd love to hear your story."
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all resize-none bg-white"
                      style={{ fontSize: '16px', lineHeight: '1.6' }}
                    />
                  </div>
                </div>

                {/* Submit Section */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <p className="text-gray-600" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                      By submitting this form, you agree to our volunteer terms and background check process.
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-sm hover:shadow-lg rounded-xl whitespace-nowrap flex items-center justify-center gap-2"
                      style={{ fontWeight: 600, fontSize: '17px' }}
                    >
                      <Heart size={20} />
                      Submit Application
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column - What We Expect */}
            <div>
              <h2 className="text-gray-900 mb-8">
                What we expect
              </h2>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <Check className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Compassion and respect
                    </h3>
                    <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      Treat everyone with dignity and genuine care, understanding that each person's needs are unique.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Reliability
                    </h3>
                    <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      Show up when you commit to helping. People are counting on you for important activities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Willingness to learn
                    </h3>
                    <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      Complete our training resources and continuously educate yourself about accessibility and disability etiquette.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Clear communication
                    </h3>
                    <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      Respond promptly to requests and communicate openly about your availability and capabilities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Background check
                    </h3>
                    <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      Complete our verification process to ensure the safety and security of our community members.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Time commitment
                    </h3>
                    <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      Dedicate at least a few hours per month to volunteering, though more is always appreciated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-amber-50 border-l-4 border-amber-500">
                <h3 className="text-gray-900 mb-3">
                  Training provided
                </h3>
                <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  All volunteers receive comprehensive training on disability awareness, communication strategies, and safety protocols before being matched with community members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}