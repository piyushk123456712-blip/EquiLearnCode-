import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Lesson } from './pages/Lesson';
import { Roadmaps } from './pages/Roadmaps';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Settings } from './pages/Settings';
import { Notes } from './pages/Notes';
import { Compiler } from './pages/Compiler';

function App() {
  useEffect(() => {
    const handleGlobalClick = () => {
      const lastAdTime = sessionStorage.getItem("lastGlobalAdTime");
      const now = Date.now();
      // Show an ad on click at most once every 2 minutes (120000 ms)
      if (!lastAdTime || now - parseInt(lastAdTime) > 120000) {
        const w = window.open("https://www.effectivecpmnetwork.com/yafmt03w6?key=b93a2e046bc3e4d661aef48a4bdd1b09", "_blank");
        if (w) {
          sessionStorage.setItem("lastGlobalAdTime", now.toString());
        }
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 bg-background text-foreground">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/settings" element={<Settings />} />
            <Route path="/notes" element={<Notes />} />
              <Route path="/compiler" element={<Compiler />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
