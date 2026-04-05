import { ArrowRight, BookOpen, Users, ChevronUp, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { api } from '../utils/server-api';

type TutorialItem = {
  id: number | string;
  title: string;
  description: string;
  category: string;
  video_url?: string;
  views_count: number;
};

export function Tutorials() {
  const [expandedUserTutorials, setExpandedUserTutorials] = useState<(number | string)[]>([]);
  const [expandedVolunteerTutorials, setExpandedVolunteerTutorials] = useState<(number | string)[]>([]);
  const [tutorials, setTutorials] = useState<TutorialItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleToggleTutorial = async (
    id: number | string,
    currentExpanded: (number | string)[],
    setExpanded: Dispatch<SetStateAction<(number | string)[]>>,
  ) => {
    const isExpanded = currentExpanded.includes(id);

    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );

    if (!isExpanded) {
      try {
        const result = await api.publicTutorials.trackView(id);
        const views = Number(result?.data?.views_count ?? result?.views_count);
        if (Number.isFinite(views)) {
          setTutorials((prev) =>
            prev.map((tutorial) =>
              tutorial.id === id ? { ...tutorial, views_count: views } : tutorial,
            ),
          );
        }
      } catch {
        // Ignore view tracking failures and keep tutorial interaction smooth.
      }
    }
  };

  useEffect(() => {
    const loadTutorials = async () => {
      try {
        setLoading(true);
        const data = await api.publicTutorials.getAll();
        const mapped = (data || []).map((item: any) => ({
          id: item.id,
          title: item.title || 'Untitled tutorial',
          description: item.description || 'No description yet.',
          category: item.category || 'General',
          video_url: item.video_url || '',
          views_count: Number(item.views_count || 0),
        }));
        setTutorials(mapped);
      } catch {
        setTutorials([]);
      } finally {
        setLoading(false);
      }
    };

    loadTutorials();
  }, []);

  const { userTutorials, volunteerTutorials } = useMemo(() => {
    const users: TutorialItem[] = [];
    const volunteers: TutorialItem[] = [];

    tutorials.forEach((tutorial) => {
      const category = tutorial.category.toLowerCase();
      const isVolunteer =
        category.includes('volunteer') ||
        category.includes('companion') ||
        category.includes('helper');

      if (isVolunteer) {
        volunteers.push(tutorial);
      } else {
        users.push(tutorial);
      }
    });

    return {
      userTutorials: users,
      volunteerTutorials: volunteers,
    };
  }, [tutorials]);

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
            {loading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="animate-spin" size={18} />
                Loading tutorials...
              </div>
            ) : userTutorials.length > 0 ? userTutorials.map((tutorial) => {
              const isExpanded = expandedUserTutorials.includes(tutorial.id);
              return (
                <div 
                  key={tutorial.id}
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
                        <p>{tutorial.description}</p>
                        {tutorial.video_url ? (
                          <a
                            href={tutorial.video_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex mt-4 text-teal-600 hover:text-teal-700 underline"
                          >
                            Watch tutorial video
                          </a>
                        ) : null}
                      </div>
                    )}
                    
                    <button 
                      onClick={() => handleToggleTutorial(tutorial.id, expandedUserTutorials, setExpandedUserTutorials)}
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
            }) : (
              <div className="bg-white border-l-4 border-teal-600 shadow-sm p-8 text-gray-600">
                No tutorials available right now.
              </div>
            )}
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
            {loading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="animate-spin" size={18} />
                Loading tutorials...
              </div>
            ) : volunteerTutorials.length > 0 ? volunteerTutorials.map((tutorial) => {
              const isExpanded = expandedVolunteerTutorials.includes(tutorial.id);
              return (
                <div 
                  key={tutorial.id}
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
                        <p>{tutorial.description}</p>
                        {tutorial.video_url ? (
                          <a
                            href={tutorial.video_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex mt-4 text-teal-600 hover:text-teal-700 underline"
                          >
                            Watch tutorial video
                          </a>
                        ) : null}
                      </div>
                    )}
                    
                    <button 
                      onClick={() => handleToggleTutorial(tutorial.id, expandedVolunteerTutorials, setExpandedVolunteerTutorials)}
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
            }) : (
              <div className="bg-white border-l-4 border-teal-600 shadow-sm p-8 text-gray-600">
                No volunteer tutorials available right now.
              </div>
            )}
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