import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Code, Database, Globe, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
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
  kotlin: <Smartphone className="w-8 h-8 text-violet-500" />
};

export const Home = () => {
  const { language, allCourses } = useAppContext();
  const t = translations[language];

  useSEO({
    title: t.heroTitle,
    description: t.heroSubtitle
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free Coding Education Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center h-12 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:shadow-lg w-full sm:w-auto text-base"
            >
              {t.startLearning}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/compiler"
              className="inline-flex items-center justify-center h-12 px-8 py-3 bg-secondary text-secondary-foreground font-medium rounded-full hover:bg-secondary/80 transition-colors w-full sm:w-auto text-base border border-border"
            >
              <Code className="mr-2 h-5 w-5 text-primary" />
              Online Code Compiler
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>12+ Programming Languages</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Hindi & English Dual Audio</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No Sign-Up or Paywall Required</span>
            </div>
          </div>
        </div>
      </section>

      <AdPlaceholder type="banner" />

      {/* Popular Courses Section */}
      <section className="py-20 bg-accent/20 border-y border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.popularCourses}</h2>
              <p className="text-muted-foreground text-sm mt-1">Explore our most popular courses and start coding instantly.</p>
            </div>
            <Link to="/courses" className="text-primary hover:underline font-semibold flex items-center gap-1 text-sm">
              View all {allCourses.length} courses &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCourses.slice(0, 8).map(course => (
              <div key={course.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-secondary rounded-lg group-hover:scale-105 transition-transform">
                    {iconMap[course.icon] || <Code className="w-8 h-8 text-primary" />}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full capitalize">
                    {course.level === 'beginner' ? t.beginner : t.intermediate}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                  {language === 'hi' ? (course.descriptionHi || course.description) : course.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <span className="text-xs font-medium text-muted-foreground">
                    {course.chapters?.flatMap((ch: any) => ch.lessons)?.length || 0} Lessons
                  </span>
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform"
                  >
                    Start Course &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdPlaceholder type="banner" />

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.courseCategories}</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-12">
            Structured domains curated for beginners, college students, and aspiring professional software engineers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/courses?category=languages" className="p-6 border border-border rounded-2xl hover:border-primary hover:shadow-md transition-all bg-card group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-foreground mb-1">{t.programmingLanguages}</h3>
              <p className="text-xs text-muted-foreground">Python, C, C++, Java, Rust, Go</p>
            </Link>
            <Link to="/courses?category=web" className="p-6 border border-border rounded-2xl hover:border-primary hover:shadow-md transition-all bg-card group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-1">{t.webDevelopment}</h3>
              <p className="text-xs text-muted-foreground">HTML, CSS, JavaScript, React, Node.js</p>
            </Link>
            <Link to="/courses?category=databases" className="p-6 border border-border rounded-2xl hover:border-primary hover:shadow-md transition-all bg-card group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-1">{t.databases}</h3>
              <p className="text-xs text-muted-foreground">SQL, Relational Schemas, Queries</p>
            </Link>
            <Link to="/courses?category=systems" className="p-6 border border-border rounded-2xl hover:border-primary hover:shadow-md transition-all bg-card group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-1">Systems & Mobile</h3>
              <p className="text-xs text-muted-foreground">Kotlin, Android Apps, Systems</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
