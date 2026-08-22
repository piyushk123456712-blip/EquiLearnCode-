const fs = require('fs');
let content = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

// 1. Add states
const stateCode = `const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showVideoAd, setShowVideoAd] = useState(false);
  const [adTimeLeft, setAdTimeLeft] = useState(10);`;
content = content.replace("const [sidebarOpen, setSidebarOpen] = useState(false);", stateCode);

// 2. Add effects
const effectCode = `useEffect(() => {
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
  }, [showVideoAd, adTimeLeft]);`;
content = content.replace("useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [lessonId]);", effectCode);

// 3. Add ad overlay inside video container
const videoContainerStart = '<div className="relative w-full rounded-xl overflow-hidden bg-black shadow-lg mb-8 aspect-video">';
const adHtml = `
          {showVideoAd && (
            <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-white backdrop-blur-md">
              <div className="absolute top-4 right-4 bg-black/80 px-3 py-1.5 rounded text-sm border border-white/20 font-medium">
                Ad closes in {adTimeLeft}s
              </div>
              <div className="text-center p-6 max-w-lg mx-auto">
                <span className="inline-block px-2 py-1 bg-yellow-500 text-black text-[10px] font-bold rounded mb-4 uppercase tracking-wider">Advertisement</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">EquiLearnCode Premium</h3>
                <p className="text-gray-300 mb-6 text-sm md:text-base">Get 50% off on all Premium Certification Courses today. Elevate your coding journey with 1-on-1 mentorship.</p>
                <button 
                  onClick={() => setShowVideoAd(false)}
                  className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition shadow-lg shadow-primary/20"
                >
                  Claim Offer
                </button>
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
`;
content = content.replace(videoContainerStart, videoContainerStart + adHtml);

fs.writeFileSync('src/pages/Lesson.tsx', content);
