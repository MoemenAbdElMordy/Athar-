import { Target, Lightbulb, TrendingUp, Compass } from 'lucide-react';

export function About() {
  return (
    <div className="bg-teal-50">
      {/* Hero Title */}
      <section className="py-32 bg-teal-50 border-b-4 border-teal-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="border-l-4 border-teal-700 pl-8">
            <h1 className="text-gray-900 mb-6">
              About Athar
            </h1>
            <p className="text-gray-900 max-w-3xl" style={{ fontSize: '20px', lineHeight: '1.7' }}>
              Athar is more than an accessibility platform — it's a movement toward inclusive communities where everyone can participate fully in public life, regardless of their abilities.
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* Why Athar Exists */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex gap-6 mb-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                <Lightbulb className="text-white" size={32} />
              </div>
            </div>
            <div>
              <h2 className="text-gray-900 mb-6">
                Why Athar exists
              </h2>
            </div>
          </div>
          
          <div className="space-y-6 text-gray-900" style={{ fontSize: '18px', lineHeight: '1.75' }}>
            <p>
              People of determination face countless barriers when navigating public spaces. From unclear accessibility information to lack of support when needed, these challenges limit independence and participation in everyday activities.
            </p>
            <p>
              We created Athar to address this gap. By combining comprehensive accessibility information with a compassionate volunteer network, we're building a support system that empowers people to move through the world with confidence.
            </p>
            <p>
              Our platform was born from listening to the real experiences of people with disabilities, their families, and support workers. We understand that accessibility isn't just about ramps and elevators — it's about dignity, independence, and community.
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* Our Mission */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex gap-6 mb-10">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                <Target className="text-white" size={32} />
              </div>
            </div>
            <div>
              <h2 className="text-gray-900 mb-3">
                Our mission
              </h2>
              <p className="text-gray-900" style={{ fontSize: '18px', lineHeight: '1.7' }}>
                Creating a world where accessibility is the standard, not an afterthought
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 border-l-4 border-teal-700 shadow-lg">
            <div className="space-y-6 text-gray-900" style={{ fontSize: '17px', lineHeight: '1.75' }}>
              <p>
                To create a world where accessibility is the norm, not the exception. We're working to ensure that every person, regardless of ability, can access the information and support they need to live independently and participate fully in their communities.
              </p>
              <p style={{ fontWeight: 600, color: '#1F3C5B' }}>
                We do this by:
              </p>
              <ul className="space-y-4 ml-2">
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-700 flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm" style={{ fontWeight: 700 }}>✓</span>
                  </span>
                  <span>Building comprehensive, reliable accessibility information that people can trust</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-700 flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm" style={{ fontWeight: 700 }}>✓</span>
                  </span>
                  <span>Connecting people who need support with volunteers who are ready to help</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-700 flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm" style={{ fontWeight: 700 }}>✓</span>
                  </span>
                  <span>Educating communities about accessibility and inclusion</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-700 flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm" style={{ fontWeight: 700 }}>✓</span>
                  </span>
                  <span>Advocating for better accessibility standards and practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* Our Approach */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex gap-6 mb-12">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                <Compass className="text-white" size={32} />
              </div>
            </div>
            <div>
              <h2 className="text-gray-900 mb-4">
                Our approach
              </h2>
              <p className="text-gray-900" style={{ fontSize: '18px', lineHeight: '1.7' }}>
                The core principles that guide everything we do at Athar
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-teal-700 shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
              <h3 className="text-gray-900 mb-4" style={{ fontSize: '20px', fontWeight: 600 }}>
                Community-centered
              </h3>
              <p className="text-gray-900" style={{ fontSize: '17px', lineHeight: '1.75' }}>
                Athar is built by listening to and learning from people of determination. Every feature, every design decision, comes from understanding real needs and real experiences. We don't assume — we ask, we listen, and we collaborate.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-teal-700 shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
              <h3 className="text-gray-900 mb-4" style={{ fontSize: '20px', fontWeight: 600 }}>
                Technology as enabler
              </h3>
              <p className="text-gray-900" style={{ fontSize: '17px', lineHeight: '1.75' }}>
                We use technology not for its own sake, but as a tool to solve real problems. Our platform is designed to be accessible, intuitive, and reliable — because technology should remove barriers, not create new ones.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-teal-700 shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
              <h3 className="text-gray-900 mb-4" style={{ fontSize: '20px', fontWeight: 600 }}>
                Compassion and dignity
              </h3>
              <p className="text-gray-900" style={{ fontSize: '17px', lineHeight: '1.75' }}>
                At the heart of everything we do is respect for human dignity. Our volunteer network is trained not just in practical support, but in understanding the importance of empowerment, choice, and independence.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-teal-700 shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
              <h3 className="text-gray-900 mb-4" style={{ fontSize: '20px', fontWeight: 600 }}>
                Continuous improvement
              </h3>
              <p className="text-gray-900" style={{ fontSize: '17px', lineHeight: '1.75' }}>
                Accessibility needs evolve, and so do we. We're committed to constantly learning, adapting, and improving our platform based on user feedback and emerging best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t-2 border-gray-300"></div>
      </div>

      {/* Impact Vision */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex gap-6 mb-10">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                <TrendingUp className="text-white" size={32} />
              </div>
            </div>
            <div>
              <h2 className="text-gray-900 mb-3">
                Our vision for impact
              </h2>
              <p className="text-gray-900" style={{ fontSize: '18px', lineHeight: '1.7' }}>
                Building a future where accessibility is the default, not an exception
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 border-l-4 border-teal-700 shadow-lg">
            <div className="space-y-6 text-gray-900" style={{ fontSize: '17px', lineHeight: '1.75' }}>
              <p>
                We envision a future where asking "Is this place accessible?" is unnecessary because accessibility is a given. Where people of determination can travel, work, and socialize without second-guessing whether they'll face barriers.
              </p>
              <p>
                We see Athar as a catalyst for broader change — not just providing information, but inspiring businesses and organizations to improve their accessibility. Not just connecting volunteers, but building a culture of mutual support and understanding.
              </p>
              <p>
                Through Athar, we're proving that when we center accessibility and inclusion, everyone benefits. We're creating a model that can scale globally, adapting to different communities while maintaining our core commitment to dignity, independence, and connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infographic Section */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-gray-900 mb-12 text-center">
            Athar by the numbers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white border-2 border-teal-600 shadow-lg">
              <div className="text-5xl text-teal-700 mb-4" style={{ fontWeight: 700 }}>1,000+</div>
              <p className="text-gray-900" style={{ fontSize: '18px', lineHeight: '1.6' }}>Accessible locations mapped</p>
            </div>
            <div className="text-center p-8 bg-white border-2 border-teal-600 shadow-lg">
              <div className="text-5xl text-teal-700 mb-4" style={{ fontWeight: 700 }}>500+</div>
              <p className="text-gray-900" style={{ fontSize: '18px', lineHeight: '1.6' }}>Active volunteers</p>
            </div>
            <div className="text-center p-8 bg-white border-2 border-teal-600 shadow-lg">
              <div className="text-5xl text-teal-700 mb-4" style={{ fontWeight: 700 }}>10,000+</div>
              <p className="text-gray-900" style={{ fontSize: '18px', lineHeight: '1.6' }}>People supported</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}