import { useParams, Link, useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle, BookOpen, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

import { translations } from '../data/translations';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { useSEO } from '../hooks/useSEO';

export const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { language, progress, allCourses } = useAppContext();
  const t = translations[language];

  const course = allCourses.find(c => c.id === courseId);

  useSEO({
    title: course ? course.title : 'Course Not Found',
    description: course ? (language === 'hi' ? (course.descriptionHi || course.description) : course.description) : 'Course details',
  });

  if (!course) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[50vh] flex flex-col justify-center">
        <h1 className="text-3xl font-bold">Course not found</h1>
        <button onClick={() => navigate(-1)} className="text-primary hover:underline mt-4">Go back</button>
      </div>
    );
  }

  const allLessons = course.chapters.flatMap(ch => ch.lessons) || [];
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter(l => progress[l.id]).length;
  
  const firstLesson = allLessons[0];
  const nextIncomplete = allLessons.find(l => !progress[l.id]) || firstLesson;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      {/* Header */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full capitalize">
              {course.level === 'beginner' ? t.beginner : t.intermediate}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {totalLessons} {t.lessons}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{course.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {language === 'hi' ? (course.descriptionHi || course.description) : course.description}
          </p>
        </div>
        
        {totalLessons > 0 && (
          <div className="w-full md:w-auto flex flex-col gap-4 bg-background p-6 rounded-xl border border-border shrink-0 text-center">
            <div className="text-sm font-medium text-muted-foreground">Course Progress</div>
            <div className="text-3xl font-bold text-foreground">{completedCount} / {totalLessons}</div>
            
            {firstLesson ? (
              <Link
                to={`/courses/${course.id}/lessons/${nextIncomplete.id}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                {completedCount === 0 ? t.startLearning : t.continueLearning}
              </Link>
            ) : (
              <button disabled className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md opacity-50 cursor-not-allowed">
                Coming Soon
              </button>
            )}
          </div>
        )}
      </div>

      {/* Curriculum */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Course Curriculum</h2>
        
        {course.chapters.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-xl text-muted-foreground">
            Lessons are being added to this course. Check back soon!
          </div>
        ) : (
          <div className="space-y-6">
            {course.chapters.map((chapter, idx) => (
              <div key={chapter.id} className="border border-border rounded-xl overflow-hidden bg-card">
                <div className="bg-secondary/50 px-6 py-4 border-b border-border">
                  <h3 className="font-semibold text-foreground text-lg">
                    {idx + 1}. {language === 'hi' && chapter.titleHi ? chapter.titleHi : chapter.title}
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {chapter.lessons.map((lesson, lessonIdx) => {
                    const isCompleted = progress[lesson.id];
                    return (
                      <Link
                        key={lesson.id}
                        to={`/courses/${course.id}/lessons/${lesson.id}`}
                        className="flex items-center p-4 hover:bg-accent transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-4 shrink-0 text-sm font-medium text-muted-foreground group-hover:bg-background group-hover:text-foreground">
                          {lessonIdx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">
                            {language === 'hi' && lesson.titleHi ? lesson.titleHi : lesson.title}
                          </h4>
                        </div>
                        <div className="ml-4 shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <PlayCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdPlaceholder type="banner" className="mt-12" />
    </div>
  );
};
