const fs = require('fs');
let content = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

// replace import
content = content.replace("import { courses } from '../data/courses';", "");

// update useAppContext usage
content = content.replace("const { language, progress, markCompleted } = useAppContext();", "const { language, progress, markCompleted, allCourses, getVideoUrl } = useAppContext();");

// update courses.find -> allCourses.find
content = content.replace("courses.find", "allCourses.find");

// add state for mp4 video url
if (!content.includes("mp4Url")) {
  content = content.replace("const [videoLang, setVideoLang] = useState<'en' | 'hi'>", "const [mp4Url, setMp4Url] = useState<string | null>(null);\n  const [videoLang, setVideoLang] = useState<'en' | 'hi'>");
  
  const effectCode = `
  useEffect(() => {
    if (currentLesson?.mp4FileId) {
      getVideoUrl(currentLesson.mp4FileId).then(url => setMp4Url(url));
    } else {
      setMp4Url(null);
    }
  }, [currentLesson?.mp4FileId, getVideoUrl]);
  `;
  content = content.replace("useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [lessonId]);", "useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [lessonId]);\n" + effectCode);
}

// Update the video player logic
const newVideoPlayer = `
        {/* Video Player */}
        <div className="relative w-full rounded-xl overflow-hidden bg-black shadow-lg mb-8 aspect-video">
          {mp4Url ? (
            <video 
              className="absolute top-0 left-0 w-full h-full"
              controls
              src={mp4Url}
            />
          ) : videoId ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={\`https://www.youtube.com/embed/\${videoId}?rel=0\`}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-muted-foreground">
              No video available for this lesson.
            </div>
          )}
        </div>
`;
content = content.replace(/<div className="relative w-full rounded-xl overflow-hidden bg-black shadow-lg mb-8 aspect-video">[\s\S]*?<\/div>/, newVideoPlayer);

fs.writeFileSync('src/pages/Lesson.tsx', content);
