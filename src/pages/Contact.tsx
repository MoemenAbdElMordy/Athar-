import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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

  return (
    <div className="bg-teal-50">
      {/* Hero Title */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-gray-900 mb-6">
            Contact us
          </h1>
          <p className="text-gray-700 max-w-3xl" style={{ fontSize: '20px', lineHeight: '1.7' }}>
            Have questions, feedback, or need support? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-gray-900 mb-12">
                Get in touch
              </h2>

              <div className="space-y-10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                      <Mail className="text-teal-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Email
                    </h3>
                    <p className="text-gray-700 mb-2" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      For general inquiries and support
                    </p>
                    <a href="mailto:contact@athar.com" className="text-teal-600 hover:text-teal-700 transition-colors" style={{ fontWeight: 600 }}>
                      contact@athar.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                      <Phone className="text-teal-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Phone
                    </h3>
                    <p className="text-gray-700 mb-2" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      Monday to Friday, 9am to 5pm
                    </p>
                    <a href="tel:+1234567890" className="text-teal-600 hover:text-teal-700 transition-colors" style={{ fontWeight: 600 }}>
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                      <MapPin className="text-teal-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Address
                    </h3>
                    <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      123 Accessibility Street<br />
                      Innovation District<br />
                      Dubai, UAE
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-teal-50 border-l-4 border-teal-600">
                <h3 className="text-gray-900 mb-3">
                  Response time
                </h3>
                <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters related to safety or immediate accessibility needs, please call our phone line directly.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <div className="mb-10">
                <h2 className="text-gray-900 mb-3">
                  Send us a message
                </h2>
                <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: '1.7' }}>
                  Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-lime-50 border-l-4 border-lime-600 rounded-lg">
                  <h3 className="text-gray-900 mb-3">
                    Message sent successfully!
                  </h3>
                  <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    Thank you for contacting us. We've received your message and will respond to you shortly at the email address you provided.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                      Your name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all bg-white"
                      style={{ fontSize: '16px' }}
                    />
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
                    <label htmlFor="subject" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all appearance-none bg-white cursor-pointer"
                      style={{ fontSize: '16px', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%230D9488\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1.25rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '3rem' }}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="volunteer">Volunteer Questions</option>
                      <option value="accessibility">Accessibility Feedback</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-900 mb-2.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-50 transition-all resize-none bg-white"
                      style={{ fontSize: '16px', lineHeight: '1.6' }}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-sm hover:shadow-lg rounded-xl flex items-center justify-center gap-2"
                      style={{ fontWeight: 600, fontSize: '17px' }}
                    >
                      <Mail size={20} />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* FAQ Section */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: '1.7' }}>
              Quick answers to common questions about Athar and our services
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-teal-600 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                How do I download the Athar app?
              </h3>
              <p className="text-gray-700" style={{ fontSize: '17px', lineHeight: '1.7' }}>
                The Athar mobile app is available for download on both iOS and Android devices. Visit the App Store or Google Play Store and search for "Athar Accessibility" to download.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-teal-600 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                Is Athar free to use?
              </h3>
              <p className="text-gray-700" style={{ fontSize: '17px', lineHeight: '1.7' }}>
                Yes, Athar is completely free for all users. We believe accessibility information and community support should be available to everyone without financial barriers.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-teal-600 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                How are volunteers vetted?
              </h3>
              <p className="text-gray-700" style={{ fontSize: '17px', lineHeight: '1.7' }}>
                All volunteers go through a comprehensive verification process including background checks, reference verification, and completion of our training program before they can accept support requests.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-teal-600 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                Can businesses add their locations to Athar?
              </h3>
              <p className="text-gray-700" style={{ fontSize: '17px', lineHeight: '1.7' }}>
                Yes! We encourage businesses to claim their locations and provide detailed accessibility information. Contact us at partnerships@athar.com to get started.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-teal-600 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                What areas does Athar cover?
              </h3>
              <p className="text-gray-700" style={{ fontSize: '17px', lineHeight: '1.7' }}>
                We're currently focused on major cities in the UAE, with plans to expand to additional regions. Check the app to see coverage in your area.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}