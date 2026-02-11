import { ArrowRight, BookOpen, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function Tutorials() {
  const [expandedUserTutorials, setExpandedUserTutorials] = useState<number[]>([]);
  const [expandedVolunteerTutorials, setExpandedVolunteerTutorials] = useState<number[]>([]);

  const toggleUserTutorial = (index: number) => {
    setExpandedUserTutorials(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleVolunteerTutorial = (index: number) => {
    setExpandedVolunteerTutorials(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const userTutorials = [
    {
      title: 'Getting started with Athar',
      description: 'A complete introduction to using the Athar platform, from creating your account to finding your first accessible location.',
      fullContent: (
        <div className="space-y-4">
          <p>Welcome to Athar! This comprehensive guide will walk you through everything you need to know to get started with our platform.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Creating your account</h4>
          <p>Download the Athar app from the App Store or Google Play. Tap "Sign Up" and enter your email address or connect with your preferred social account. You'll be asked to verify your email before proceeding.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Setting up your profile</h4>
          <p>Complete your profile by adding information about your accessibility needs. This helps us personalize your experience and show you the most relevant information. You can specify mobility requirements, sensory preferences, and communication needs.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Finding accessible locations</h4>
          <p>Use the search function to find locations near you. Filter by accessibility features like wheelchair access, quiet spaces, accessible parking, or hearing loops. Each location shows detailed accessibility information contributed by our community.</p>
        </div>
      ),
    },
    {
      title: 'Understanding accessibility ratings',
      description: 'Learn how to read and interpret accessibility information for different types of locations and facilities.',
      fullContent: (
        <div className="space-y-4">
          <p>Athar uses a comprehensive rating system to help you understand the accessibility features of any location.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Rating categories</h4>
          <p>We rate locations across multiple dimensions: mobility access, visual accessibility, hearing accessibility, sensory-friendly features, and cognitive accessibility. Each category is rated independently to give you a complete picture.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Understanding the symbols</h4>
          <p>Green checkmarks indicate fully accessible features. Orange symbols indicate partial accessibility or features that work with assistance. Red indicators show barriers or inaccessible features. Gray means information is not yet available.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Community contributions</h4>
          <p>Ratings are based on verified community reviews and official accessibility audits. The more reviews a location has, the more reliable the information. You can always add your own experience to help others.</p>
        </div>
      ),
    },
    {
      title: 'Using Athar with screen readers',
      description: 'Step-by-step guide for using Athar with VoiceOver, TalkBack, and other assistive technologies.',
      fullContent: (
        <div className="space-y-4">
          <p>Athar is designed to work seamlessly with all major screen readers and assistive technologies.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>VoiceOver on iOS</h4>
          <p>All buttons, images, and interactive elements include descriptive labels. Use swipe gestures to navigate between elements. Double-tap to activate buttons. The map view includes audio descriptions of nearby accessible locations.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>TalkBack on Android</h4>
          <p>Navigate with single-finger swipes and double-tap to select. Use explore-by-touch to find elements on the screen. All important information is announced in a logical reading order.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Keyboard navigation</h4>
          <p>The web version supports full keyboard navigation. Use Tab to move between elements, Enter to activate, and arrow keys to navigate within lists and menus. All functionality is available without a mouse.</p>
        </div>
      ),
    },
    {
      title: 'Planning accessible journeys',
      description: 'How to use Athar to plan trips, identify potential barriers, and arrange support in advance.',
      fullContent: (
        <div className="space-y-4">
          <p>Planning ahead makes any journey smoother. Athar helps you identify accessible routes and potential challenges before you leave.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Route planning</h4>
          <p>Enter your starting point and destination. Athar will suggest routes that prioritize accessible pathways, highlight locations with accessible facilities along the way, and warn you about potential barriers like stairs or rough terrain.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Saving favorite locations</h4>
          <p>Bookmark frequently visited locations to quickly access their accessibility information. Create custom lists for different types of trips - shopping, dining, medical appointments, or leisure activities.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Arranging support</h4>
          <p>For complex journeys, you can request volunteer assistance in advance. Specify when and where you need support, and volunteers in the area will receive your request.</p>
        </div>
      ),
    },
    {
      title: 'Requesting volunteer support',
      description: 'Complete guide to requesting assistance, choosing volunteers, and coordinating meetups safely.',
      fullContent: (
        <div className="space-y-4">
          <p>Athar connects you with verified volunteers who can provide assistance when you need it.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Creating a support request</h4>
          <p>Tap the "Request Support" button and describe what kind of assistance you need. Specify the date, time, and location. Be clear about your needs - whether it's navigation help, physical assistance, or just having someone accompany you.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Choosing a volunteer</h4>
          <p>You'll see profiles of available volunteers, including their experience, ratings from other users, and languages spoken. Read their reviews and choose someone you feel comfortable with. You can message them before confirming.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Safety features</h4>
          <p>All volunteers are verified with ID checks. You can share your live location with trusted contacts during the meetup. Rate your experience afterwards to help maintain community safety and quality.</p>
        </div>
      ),
    },
    {
      title: 'Wheelchair accessibility features',
      description: 'Understanding ramp gradients, door widths, accessible parking, and other mobility considerations.',
      fullContent: (
        <div className="space-y-4">
          <p>Athar provides detailed information about physical accessibility features at every location.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Entrance accessibility</h4>
          <p>We note whether entrances have steps, ramps, or are level with the street. Ramp gradients are specified so you know if you might need assistance. Door widths are measured to ensure wheelchair clearance.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Interior navigation</h4>
          <p>Information includes corridor widths, elevator availability and size, accessible restroom locations, and turning space in different areas. We also note floor surfaces - carpet, tile, or rough terrain.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Parking and transportation</h4>
          <p>Locations show whether accessible parking is available, how many spaces there are, and the distance to the entrance. We also include information about nearby public transportation with accessibility features.</p>
        </div>
      ),
    },
    {
      title: 'Sensory accessibility information',
      description: 'How to find quiet spaces, understand lighting conditions, and manage sensory environments.',
      fullContent: (
        <div className="space-y-4">
          <p>Sensory-friendly environments are crucial for many people. Athar helps you find spaces that match your sensory needs.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Noise levels</h4>
          <p>Locations are rated for typical noise levels. We distinguish between quiet spaces, moderate ambient noise, and loud environments. Time-specific information helps you know when places are quieter.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Lighting conditions</h4>
          <p>Information includes whether lighting is bright or dim, if there are fluorescent lights (which can be problematic for some), availability of natural light, and whether you can request dimmer settings.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Sensory-friendly features</h4>
          <p>We highlight quiet rooms, low-stimulation areas, the availability of noise-canceling spaces, and whether staff are trained in sensory-friendly accommodations.</p>
        </div>
      ),
    },
    {
      title: 'Adding reviews and feedback',
      description: 'Help the community by sharing your experiences and accessibility insights about locations you visit.',
      fullContent: (
        <div className="space-y-4">
          <p>Your experiences help build a comprehensive accessibility database that benefits the entire community.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Writing helpful reviews</h4>
          <p>After visiting a location, tap "Add Review" and rate the accessibility features you experienced. Be specific - instead of "not accessible," describe what barriers you encountered. Mention helpful staff, workarounds you discovered, or features that worked well.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Adding photos</h4>
          <p>Photos of entrances, ramps, accessible restrooms, and parking spaces are incredibly valuable. Make sure photos clearly show the features you're documenting. Other users really appreciate visual information.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Updating information</h4>
          <p>If you notice information has changed - a ramp was added, an elevator is broken, or parking spaces were removed - please update the listing. Recent information helps everyone plan more effectively.</p>
        </div>
      ),
    },
  ];

  const volunteerTutorials = [
    {
      title: 'Becoming an Athar volunteer',
      description: 'Everything you need to know about signing up, verification, and starting your volunteer journey.',
      fullContent: (
        <div className="space-y-4">
          <p>Thank you for your interest in becoming an Athar volunteer! Here's how to get started.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Sign up process</h4>
          <p>Download the Athar app and select "Become a Volunteer" on the registration screen. You'll be asked to provide your name, contact information, and a brief description of your motivation to volunteer.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Verification requirements</h4>
          <p>To ensure community safety, all volunteers must complete ID verification and a background check. You'll upload a photo of your government-issued ID and complete a short video verification call with our team.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Training and orientation</h4>
          <p>Complete our online training modules covering disability etiquette, communication techniques, and safety protocols. The training takes about 2 hours and can be done at your own pace. After completion, you'll be approved to accept support requests.</p>
        </div>
      ),
    },
    {
      title: 'Disability etiquette and communication',
      description: 'Learn respectful, person-first communication and avoid common mistakes when offering assistance.',
      fullContent: (
        <div className="space-y-4">
          <p>Respectful communication is the foundation of good volunteer support. Here are key principles to follow.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Person-first language</h4>
          <p>Say "person with a disability" rather than "disabled person." Focus on the individual, not their disability. Avoid terms like "confined to a wheelchair" (people use wheelchairs; they're not confined) or "suffering from" (which implies victimhood).</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Always ask before helping</h4>
          <p>Never assume someone needs assistance. Always ask "May I help you?" and wait for their response. If they decline, respect that decision. If they accept, ask how they'd like to be helped rather than assuming you know best.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Communication tips</h4>
          <p>Speak directly to the person, not to their companion or interpreter. Make eye contact when speaking. Use a normal tone of voice unless asked to speak louder. Be patient - some people need more time to communicate, and that's completely fine.</p>
        </div>
      ),
    },
    {
      title: 'Providing mobility assistance',
      description: 'Best practices for guiding wheelchair users, offering physical support, and navigating different terrains.',
      fullContent: (
        <div className="space-y-4">
          <p>Providing mobility assistance requires knowledge of proper techniques to ensure safety and comfort.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Wheelchair assistance</h4>
          <p>Always ask before touching someone's wheelchair - it's part of their personal space. When pushing a wheelchair, announce obstacles, curbs, and changes in terrain. Go slowly over bumps and face forward when going downhill. Never leave someone in an unsafe position.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Offering physical support</h4>
          <p>If someone needs an arm for stability, offer your elbow for them to hold - don't grab their arm. Walk at their pace, not yours. Describe upcoming terrain changes: "There's a curb coming up in three steps" or "The floor becomes slippery ahead."</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Navigating obstacles</h4>
          <p>Look ahead for obstacles and plan your route. When approaching stairs, describe them: "Five steps up, with a handrail on the right." For ramps, note the gradient and length. Always prioritize the safest route, even if it's longer.</p>
        </div>
      ),
    },
    {
      title: 'Supporting people with visual impairments',
      description: 'Techniques for sighted guiding, describing environments, and providing orientation assistance.',
      fullContent: (
        <div className="space-y-4">
          <p>Guiding someone with a visual impairment requires specific techniques and clear verbal communication.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Sighted guide technique</h4>
          <p>Offer your elbow for the person to hold, staying slightly ahead of them. Describe what's coming: "We're approaching a doorway, it opens to the right." For narrow spaces, move your guiding arm behind your back to signal single-file walking.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Describing environments</h4>
          <p>Give specific, useful information: "The entrance is about 10 steps ahead, double doors opening outward." Use clock positions for locating items: "Your coffee is at 2 o'clock." Describe obstacles, changes in floor surface, and upcoming stairs or curbs.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Seating and orienting</h4>
          <p>When helping someone sit, guide their hand to the back of the chair and let them seat themselves. Describe the room layout using a reference point: "The door we entered is behind you, the counter is about 6 feet straight ahead."</p>
        </div>
      ),
    },
    {
      title: 'Assisting people with hearing impairments',
      description: 'Communication strategies, facing the person when speaking, and using visual cues effectively.',
      fullContent: (
        <div className="space-y-4">
          <p>Effective communication with people who are deaf or hard of hearing requires awareness and adaptation.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Communication basics</h4>
          <p>Always face the person when speaking - many people read lips or facial expressions. Don't cover your mouth or chew gum while talking. Speak clearly at a normal pace, but don't over-enunciate as this distorts lip patterns.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Using visual cues</h4>
          <p>Get the person's attention before speaking - a gentle wave or tap on the shoulder works. Use gestures and body language to support your words. Point to objects or directions. Write things down if verbal communication isn't working.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Environmental awareness</h4>
          <p>Choose well-lit spaces for communication - people need to see your face. Minimize background noise if the person uses hearing aids. Be patient and willing to repeat or rephrase. If someone uses a sign language interpreter, still speak to and look at the person, not the interpreter.</p>
        </div>
      ),
    },
    {
      title: 'Understanding neurodiversity',
      description: 'Supporting people with autism, ADHD, and other cognitive differences with patience and understanding.',
      fullContent: (
        <div className="space-y-4">
          <p>Neurodivergent individuals may process information and interact with the world differently. Flexibility and patience are key.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Communication approaches</h4>
          <p>Be clear and literal - avoid idioms and figurative language. Give one instruction at a time rather than multiple steps. Some people prefer written communication or need extra time to process verbal information. That's completely normal.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Sensory considerations</h4>
          <p>Be aware that some people are sensitive to noise, bright lights, strong smells, or physical touch. Ask about preferences before assuming. Offer to find quieter routes or spaces if someone seems overwhelmed. Respect personal space boundaries.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Supporting routines and predictability</h4>
          <p>Many neurodivergent people benefit from knowing what to expect. Clearly explain what will happen during your time together. If plans change, communicate that as soon as possible. Respect the need for routines and sameness.</p>
        </div>
      ),
    },
    {
      title: 'Safety and boundaries',
      description: 'Maintaining appropriate boundaries, personal safety, and professional conduct as a volunteer.',
      fullContent: (
        <div className="space-y-4">
          <p>Maintaining clear boundaries ensures safe, positive experiences for everyone involved.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Professional boundaries</h4>
          <p>Keep your relationship within the volunteer context. Don't ask for personal contact information outside the app. Avoid discussing your personal problems. Focus on the person's needs during your time together.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Personal safety</h4>
          <p>Meet in public places. Share your location with a trusted contact using the in-app feature. Trust your instincts - if something feels wrong, it's okay to decline or end the interaction. Report any concerning behavior through the app.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Respecting privacy</h4>
          <p>Never share information about the people you help with others. Don't take photos without explicit permission. Respect confidentiality about disabilities, medical information, or personal circumstances you might learn about.</p>
        </div>
      ),
    },
    {
      title: 'Responding to support requests',
      description: 'How to assess requests, communicate your availability, and confirm details before meeting.',
      fullContent: (
        <div className="space-y-4">
          <p>Effectively responding to support requests ensures you can provide the best possible assistance.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Reviewing requests</h4>
          <p>Read the entire request carefully. Make sure you understand what kind of support is needed. Check the time, location, and estimated duration. Only accept requests you're genuinely able to fulfill - it's better to decline than to cancel later.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Communicating with requesters</h4>
          <p>Send a message introducing yourself and confirming you understand their needs. Ask any clarifying questions about the type of support they're expecting. Confirm the exact meeting location and time. Share relevant information about yourself that might help them feel comfortable.</p>
          <h4 className="text-gray-900" style={{ fontWeight: 600 }}>Preparing for meetups</h4>
          <p>Arrive a few minutes early so the person isn't waiting for you. Wear something described in your profile so they can identify you. Have your phone charged with the app open. Review any specific instructions or preferences they've shared.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-teal-50">
      {/* Hero Title */}
      <section className="py-32 bg-teal-50 border-b-4 border-teal-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="border-l-4 border-teal-700 pl-8">
            <h1 className="text-gray-900 mb-6">
              Tutorials and guides
            </h1>
            <p className="text-gray-700 max-w-3xl" style={{ fontSize: '20px', lineHeight: '1.7' }}>
              Comprehensive resources to help you navigate accessibility, use the Athar platform effectively, and support others in your community with confidence and respect.
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Tutorials for People of Determination */}
      <section className="py-32 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
              <BookOpen className="text-teal-600" size={24} />
            </div>
            <h2 className="text-gray-900">
              For people of determination
            </h2>
          </div>

          <div className="space-y-6">
            {userTutorials.map((tutorial, index) => {
              const isExpanded = expandedUserTutorials.includes(index);
              return (
                <div 
                  key={index}
                  className="bg-white border-l-4 border-teal-600 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-8">
                    <h3 className="text-gray-900 mb-3">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-700 mb-6" style={{ fontSize: '18px', lineHeight: '1.7' }}>
                      {tutorial.description}
                    </p>
                    
                    {isExpanded && (
                      <div className="mb-6 pt-6 border-t border-gray-200 text-gray-700" style={{ fontSize: '17px', lineHeight: '1.8' }}>
                        {tutorial.fullContent}
                      </div>
                    )}
                    
                    <button 
                      onClick={() => toggleUserTutorial(index)}
                      className="text-teal-600 hover:text-teal-700 inline-flex items-center gap-2 group transition-colors" 
                      style={{ fontWeight: 600 }}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                      {isExpanded ? (
                        <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" />
                      ) : (
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Tutorials for Volunteers */}
      <section className="py-32 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
              <Users className="text-teal-600" size={24} />
            </div>
            <h2 className="text-gray-900">
              For volunteers and companions
            </h2>
          </div>

          <div className="space-y-6">
            {volunteerTutorials.map((tutorial, index) => {
              const isExpanded = expandedVolunteerTutorials.includes(index);
              return (
                <div 
                  key={index}
                  className="bg-white border-l-4 border-teal-600 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-8">
                    <h3 className="text-gray-900 mb-3">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-700 mb-6" style={{ fontSize: '18px', lineHeight: '1.7' }}>
                      {tutorial.description}
                    </p>
                    
                    {isExpanded && (
                      <div className="mb-6 pt-6 border-t border-gray-200 text-gray-700" style={{ fontSize: '17px', lineHeight: '1.8' }}>
                        {tutorial.fullContent}
                      </div>
                    )}
                    
                    <button 
                      onClick={() => toggleVolunteerTutorial(index)}
                      className="text-teal-600 hover:text-teal-700 inline-flex items-center gap-2 group transition-colors" 
                      style={{ fontWeight: 600 }}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                      {isExpanded ? (
                        <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" />
                      ) : (
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Additional Resources */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8">
            Need more help?
          </h2>
          <p className="text-gray-700 mb-8" style={{ fontSize: '18px', lineHeight: '1.7' }}>
            Can't find what you're looking for? We're here to help.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md"
              style={{ fontWeight: 600 }}
            >
              Contact Support
            </a>
            <a
              href="/how-it-works"
              className="px-8 py-4 text-teal-600 hover:text-teal-700 underline underline-offset-4 decoration-2 transition-colors"
              style={{ fontWeight: 600 }}
            >
              Learn How Athar Works
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}