import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle, ChevronLeft, Menu, X, PlayCircle, Code } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

import { translations } from '../data/translations';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { cn } from '../lib/utils';
import { useSEO } from '../hooks/useSEO';

export const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { language, progress, markCompleted, allCourses, getVideoUrl } = useAppContext();
  const t = translations[language];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showVideoAd, setShowVideoAd] = useState(false);
  const [adTimeLeft, setAdTimeLeft] = useState(10);
  const [mp4Url, setMp4Url] = useState<string | null>(null);
  const [videoLang, setVideoLang] = useState<'en' | 'hi'>(language);

  // Sync local video language with global language toggle if user changes it
  useEffect(() => {
    setVideoLang(language);
  }, [language]);

  // Inject Native Ad Script
  useEffect(() => {
    const containerId = "container-be32d02e0942e6dfdd2a3aace7b439f1";
    const container = document.getElementById(containerId);
    
    if (container) {
      // Clear previous ad content
      container.innerHTML = '';
      
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = "https://pl30318867.effectivecpmnetwork.com/be32d02e0942e6dfdd2a3aace7b439f1/invoke.js";
      
      container.appendChild(script);
    }
  }, [lessonId]);

  const course = allCourses.find(c => c.id === courseId);
  const allLessons = course?.chapters.flatMap(ch => ch.lessons) || [];
  
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex];
  
  useSEO({
    title: currentLesson ? (language === 'hi' && currentLesson.titleHi ? currentLesson.titleHi : currentLesson.title) : 'Lesson',
    description: course ? (language === 'hi' ? (course.descriptionHi || course.description) : course.description) : 'Lesson details',
  });

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  // Scroll to top on lesson change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);
  
  useEffect(() => {
    setShowVideoAd(false);
    const timer = setTimeout(() => {
      setShowVideoAd(true);
      setAdTimeLeft(10);
    }, 15000); // Popup appears 15 seconds after opening video
    return () => clearTimeout(timer);
  }, [lessonId]);

  useEffect(() => {
    let interval;
    if (showVideoAd && adTimeLeft > 0) {
      interval = setInterval(() => {
        setAdTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (showVideoAd && adTimeLeft === 0) {
      setShowVideoAd(false);
    }
    return () => clearInterval(interval);
  }, [showVideoAd, adTimeLeft]);

  useEffect(() => {
    if (currentLesson?.mp4FileId) {
      getVideoUrl(currentLesson.mp4FileId).then(url => setMp4Url(url));
    } else {
      setMp4Url(null);
    }
  }, [currentLesson?.mp4FileId, getVideoUrl]);
  

  if (!course || !currentLesson) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link to="/courses" className="text-primary hover:underline mt-4 inline-block">Return to courses</Link>
      </div>
    );
  }

  const isCompleted = progress[currentLesson.id] === true;

  const handleCompleteAndNext = () => {
    markCompleted(currentLesson.id);
    if (nextLesson) {
      navigate(`/courses/${course.id}/lessons/${nextLesson.id}`);
    }
  };

  const videoId = videoLang === 'hi' && currentLesson.videoIdHi ? currentLesson.videoIdHi : currentLesson.videoIdEn;

  const SidebarContent = () => (
    <div className="py-4 space-y-6">
      <div className="px-4 mb-2">
        <Link to={`/courses/${course.id}`} className="font-bold text-lg text-foreground hover:text-primary transition-colors block mb-1">
          {course.title}
        </Link>
      </div>
      
      {course.chapters.map((chapter, idx) => (
        <div key={chapter.id} className="mb-4">
          <h4 className="px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            {language === 'hi' && chapter.titleHi ? chapter.titleHi : chapter.title}
          </h4>
          <ul className="space-y-1">
            {chapter.lessons.map(lesson => {
              const isActive = lesson.id === currentLesson.id;
              const completed = progress[lesson.id];
              return (
                <li key={lesson.id}>
                  <Link
                    to={`/courses/${course.id}/lessons/${lesson.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 text-sm transition-colors border-l-2",
                      isActive 
                        ? "border-primary bg-primary/10 text-primary font-medium" 
                        : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <CheckCircle className={cn("w-4 h-4 shrink-0", completed ? "text-green-500" : "text-border")} />
                    <span className="line-clamp-2 leading-tight">
                      {language === 'hi' && lesson.titleHi ? lesson.titleHi : lesson.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden sticky top-[64px] z-40 bg-background border-b border-border p-4 flex items-center justify-between">
        <span className="font-semibold text-sm truncate pr-4">
          {language === 'hi' && currentLesson.titleHi ? currentLesson.titleHi : currentLesson.title}
        </span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 border border-border rounded-md shrink-0">
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Desktop Sidebar / Mobile Drawer */}
      <aside className={cn(
        "fixed md:sticky top-[64px] md:top-[64px] h-[calc(100vh-64px)] w-[280px] shrink-0 border-r border-border bg-card overflow-y-auto z-30 transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2" aria-label="Breadcrumb">
          <button onClick={() => navigate(-1)} className="hover:text-foreground font-medium flex items-center mr-4 bg-accent/50 px-3 py-1.5 rounded-md">
             <ChevronLeft className="w-4 h-4 mr-1" />
             Back
          </button>
          <Link to="/courses" className="hover:text-foreground">Courses</Link>
          <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
          <Link to={`/courses/${course.id}`} className="hover:text-foreground">{course.title}</Link>
          <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
          <span className="text-foreground font-medium truncate">
            {language === 'hi' && currentLesson.titleHi ? currentLesson.titleHi : currentLesson.title}
          </span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          {language === 'hi' && currentLesson.titleHi ? currentLesson.titleHi : currentLesson.title}
        </h1>

        <AdPlaceholder type="banner" />

        {/* Video Player Header with Lang Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 mt-8">
          <h2 className="text-xl font-bold text-foreground">Video Lesson</h2>
          {(currentLesson.videoIdHi || currentLesson.videoIdEn) && (
            <div className="flex bg-secondary/50 rounded-lg p-1 border border-border">
              {currentLesson.videoIdEn && (
                <button 
                  onClick={() => setVideoLang('en')}
                  className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", videoLang === 'en' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                >
                  English
                </button>
              )}
              {currentLesson.videoIdHi && (
                <button 
                  onClick={() => setVideoLang('hi')}
                  className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", videoLang === 'hi' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                >
                  हिन्दी
                </button>
              )}
            </div>
          )}
        </div>

        {/* Video Player / Coming Soon Placeholder */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-card border border-border shadow-md mb-8 aspect-video">
          {showVideoAd && (
            <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-white backdrop-blur-md">
              <div className="absolute top-4 right-4 bg-black/80 px-3 py-1.5 rounded text-sm border border-white/20 font-medium">
                Ad closes in {adTimeLeft}s
              </div>
              <div className="text-center p-6 max-w-lg mx-auto">
                <span className="inline-block px-2 py-1 bg-yellow-500 text-black text-[10px] font-bold rounded mb-4 uppercase tracking-wider">Advertisement</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Sponsored Offer</h3>
                <p className="text-gray-300 mb-6 text-sm md:text-base">Check out our sponsor's exclusive offer. By visiting our sponsors, you help keep our courses free for everyone!</p>
                <a 
                  href="https://www.effectivecpmnetwork.com/yafmt03w6?key=b93a2e046bc3e4d661aef48a4bdd1b09"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowVideoAd(false)}
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition shadow-lg shadow-primary/20"
                >
                  Visit Sponsor / Claim Offer
                </a>
              </div>
              {adTimeLeft <= 5 && (
                <button 
                  onClick={() => setShowVideoAd(false)}
                  className="absolute bottom-6 right-6 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium rounded transition"
                >
                  Skip Ad &rarr;
                </button>
              )}
            </div>
          )}

          {mp4Url ? (
            <video 
              className="absolute top-0 left-0 w-full h-full"
              controls
              src={mp4Url}
            />
          ) : videoId ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-accent/30 to-accent/10">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <PlayCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {language === 'hi' ? 'वीडियो व्याख्यान जल्द ही उपलब्ध होगा' : 'Video Lecture Coming Soon'}
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mb-6">
                {language === 'hi' 
                  ? 'इस पाठ के लिए वीडियो जल्द ही जोड़ा जाएगा। आप नीचे दिए गए नोट्स, कोड उदाहरण और अभ्यास समस्याओं से सीखना जारी रख सकते हैं।' 
                  : 'Video for this specific topic will be uploaded soon. You can proceed with the rich code notes and practice tasks below!'}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/settings"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Upload / Add Video in Settings &rarr;
                </Link>
                <Link
                  to="/compiler"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border"
                >
                  <Code className="w-3.5 h-3.5 text-primary" /> Open Live Compiler
                </Link>
              </div>
            </div>
          )}
        </div>


        {/* Native Ad Placement */}
        <div className="my-8 flex justify-center w-full overflow-hidden min-h-[100px]">
          <div id="container-be32d02e0942e6dfdd2a3aace7b439f1" className="w-full flex justify-center items-center"></div>
        </div>

        {/* Lesson Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <div className="text-lg text-muted-foreground mb-8">
            {language === 'hi' && currentLesson.descriptionHi ? currentLesson.descriptionHi : currentLesson.description}
          </div>
          
          {currentLesson.objectives && currentLesson.objectives.length > 0 && (
            <div className="bg-accent/50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold mt-0 mb-4">Learning Objectives</h3>
              <ul className="m-0 space-y-2">
                {currentLesson.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {currentLesson.notes && (
            <div className="mb-8">
              <h3>Notes</h3>
              <p>{currentLesson.notes}</p>
            </div>
          )}

          {currentLesson.code && (
            <div className="mb-8">
              <h3>Code Example</h3>
              <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg overflow-x-auto text-sm">
                <code>{currentLesson.code}</code>
              </pre>
            </div>
          )}

          {currentLesson.practice && (
            <div className="mb-8 border-l-4 border-primary pl-4 py-2">
              <h3 className="mt-0 text-primary">{t.practice}</h3>
              <p className="mb-0">{currentLesson.practice}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border mt-12">
          {prevLesson ? (
            <Link
              to={`/courses/${course.id}/lessons/${prevLesson.id}`}
              className="inline-flex items-center justify-center px-4 py-2 border border-border bg-background hover:bg-accent rounded-md w-full sm:w-auto transition-colors font-medium text-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t.prevLesson}
            </Link>
          ) : (
            <div className="hidden sm:block"></div>
          )}
          
          <button
            onClick={handleCompleteAndNext}
            className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md w-full sm:w-auto transition-colors font-medium text-sm"
          >
            {isCompleted ? (nextLesson ? t.nextLesson : "Finish Course") : t.completed}
            {nextLesson && <ChevronRight className="w-4 h-4 ml-2" />}
          </button>
        </div>

        <AdPlaceholder type="banner" className="mt-12" />
      </main>

      {/* Desktop Sidebar Ad Space */}
      <div className="hidden lg:block w-[300px] shrink-0 p-6 border-l border-border bg-background/50">
        <div className="sticky top-[88px]">
          <AdPlaceholder type="sidebar" />
          <AdPlaceholder type="sidebar" className="mt-6" />
        </div>
      </div>

    </div>
  );
};
