import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Terminal, Code, Database, Globe, Search, BookOpen, Layers } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { useSEO } from '../hooks/useSEO';

const iconMap: Record<string, React.ReactNode> = {
  python: <Terminal className="w-8 h-8 text-blue-500" />,
  javascript: <Code className="w-8 h-8 text-yellow-500" />,
  html: <Globe className="w-8 h-8 text-orange-500" />,
  css: <Globe className="w-8 h-8 text-blue-400" />,
  c: <Terminal className="w-8 h-8 text-blue-600" />,
  cpp: <Terminal className="w-8 h-8 text-indigo-500" />,
  java: <Code className="w-8 h-8 text-red-500" />,
  sql: <Database className="w-8 h-8 text-emerald-500" />,
  react: <Globe className="w-8 h-8 text-cyan-400" />,
  nodejs: <Terminal className="w-8 h-8 text-green-500" />,
  php: <Code className="w-8 h-8 text-purple-500" />,
  rust: <Terminal className="w-8 h-8 text-amber-600" />,
  golang: <Terminal className="w-8 h-8 text-cyan-500" />,
  kotlin: <Code className="w-8 h-8 text-violet-500" />
};

export const Courses = () => {
  const { language, allCourses } = useAppContext();
  const t = translations[language];
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: t.courses,
    description: 'Browse our free programming courses in English and Hindi'
  });

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी कोर्सेस' : 'All Courses' },
    { id: 'languages', label: t.programmingLanguages },
    { id: 'web', label: t.webDevelopment },
    { id: 'databases', label: t.databases },
    { id: 'systems', label: language === 'hi' ? 'सिस्टम्स और मोबाइल' : 'Systems & Mobile' }
  ];

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
      const titleText = (course.title || '').toLowerCase();
      const descText = (language === 'hi' ? (course.descriptionHi || course.description) : course.description || '').toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || titleText.includes(query) || descText.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [allCourses, activeCategory, searchQuery, language]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          {t.courses}
        </h1>
        <p className="text-lg text-muted-foreground">
          {language === 'hi'
            ? 'शुरुआती से लेकर उन्नत स्तर तक की सभी प्रोग्रामिंग भाषाएं पूरी तरह से मुफ्त सीखें।'
            : 'Master industry-leading programming languages and engineering fundamentals for free.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'hi' ? 'कोर्स या भाषा खोजें (उदा. Python, Java, C++)...' : 'Search courses or languages (e.g. Python, Java, C++)...'}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-1 bg-secondary rounded-full text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>
      
      <AdPlaceholder type="banner" />

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSearchParams(cat.id === 'all' ? {} : { category: cat.id })}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map(course => {
          const totalLessons = course.chapters?.flatMap((ch: any) => ch.lessons)?.length || 0;
          return (
            <div 
              key={course.id} 
              className="bg-card border border-border rounded-xl p-6 flex flex-col hover:border-primary/50 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-secondary/60 rounded-xl group-hover:scale-110 transition-transform">
                  {iconMap[course.icon] || <Code className="w-8 h-8 text-primary" />}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full capitalize">
                  {course.level === 'beginner' ? t.beginner : t.intermediate}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                {language === 'hi' ? (course.descriptionHi || course.description) : course.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {totalLessons} {language === 'hi' ? 'पाठ' : 'lessons'}
                </span>
                <Link
                  to={`/courses/${course.id}`}
                  className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center"
                >
                  {language === 'hi' ? 'शुरू करें' : 'View Course'} &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-20 bg-card border border-dashed border-border rounded-2xl max-w-lg mx-auto">
          <Layers className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {language === 'hi' ? 'कोई कोर्स नहीं मिला' : 'No courses found'}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {language === 'hi' ? 'कृपया अपनी खोज या फ़िल्टर बदलें।' : 'Try adjusting your search query or category filter.'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSearchParams({}); }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {language === 'hi' ? 'सभी कोर्सेस देखें' : 'Reset Filters'}
          </button>
        </div>
      )}
      
      <AdPlaceholder type="banner" className="mt-12" />
    </div>
  );
};
