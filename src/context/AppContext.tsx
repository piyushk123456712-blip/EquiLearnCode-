import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { courses as defaultCourses } from '../data/courses';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { get, set, del } from 'idb-keyval';

type Language = 'en' | 'hi';
type Theme = 'light' | 'dark';

export interface VideoOverride {
  videoIdEn?: string;
  videoIdHi?: string;
  mp4FileId?: string;
  pdfFileId?: string;
}

export interface CustomLesson {
  id: string;
  courseTitle: string;
  chapterTitle: string;
  lessonTitle: string;
  description: string;
  youtubeUrl: string;
  youtubeUrlHi?: string;
  mp4FileId?: string;
  pdfFileId?: string;
  code?: string;
  practice?: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  videoIdEn: string;
  videoIdHi?: string;
  mp4FileId?: string;
  pdfFileId?: string;
  objectives?: string[];
  notes?: string;
  code?: string;
  practice?: string;
  isCustom?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  titleHi?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  descriptionHi?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'web' | 'mobile' | 'ai' | 'cloud' | 'custom';
  icon: string;
  chapters: Chapter[];
}

interface AppContextType {
  language: Language;
  theme: Theme;
  progress: Record<string, boolean>;
  allCourses: Course[];
  customLessons: CustomLesson[];
  videoOverrides: Record<string, VideoOverride>;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  markCompleted: (lessonId: string) => void;
  addCustomLesson: (lesson: CustomLesson, file?: File, pdfFile?: File) => Promise<void>;
  updateLessonVideo: (lessonId: string, data: { youtubeUrlEn?: string; youtubeUrlHi?: string; mp4File?: File; pdfFile?: File }) => Promise<void>;
  deleteCustomLesson: (lessonId: string) => Promise<void>;
  resetLessonVideo: (lessonId: string) => Promise<void>;
  getVideoUrl: (fileId: string) => Promise<string | null>;
  getFileUrl: (fileId: string) => Promise<string | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function extractYoutubeId(url: string | undefined): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  
  // If already an 11 character ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([\w-]{11})/;
  const match = trimmed.match(regExp);
  return match ? match[1] : trimmed;
}

function sanitizeForFirestore<T>(data: T): T {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    return value === undefined ? null : value;
  }));
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  const [progress, setProgress] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [customLessons, setCustomLessons] = useState<CustomLesson[]>(() => {
    const saved = localStorage.getItem('cache_custom_lessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [videoOverrides, setVideoOverrides] = useState<Record<string, VideoOverride>>(() => {
    const saved = localStorage.getItem('cache_video_overrides');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    try {
      const unsub = onSnapshot(
        doc(db, 'appData', 'shared'), 
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.customLessons && Array.isArray(data.customLessons)) {
              setCustomLessons(data.customLessons);
              localStorage.setItem('cache_custom_lessons', JSON.stringify(data.customLessons));
            }
            if (data.videoOverrides && typeof data.videoOverrides === 'object') {
              setVideoOverrides(data.videoOverrides);
              localStorage.setItem('cache_video_overrides', JSON.stringify(data.videoOverrides));
            }
          }
        },
        (error) => {
          console.error("Firestore sync error:", error);
        }
      );
      return () => unsub();
    } catch (e) {
      console.error("Firestore onSnapshot subscription failed:", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const markCompleted = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      [lessonId]: true
    }));
  };

  const addCustomLesson = async (lesson: CustomLesson, file?: File, pdfFile?: File) => {
    if (pdfFile && lesson.pdfFileId) {
      await set(lesson.pdfFileId, pdfFile);
    }
    if (file && lesson.mp4FileId) {
      await set(lesson.mp4FileId, file);
    }
    const updated = [...customLessons, lesson];
    setCustomLessons(updated);
    localStorage.setItem('cache_custom_lessons', JSON.stringify(updated));
    
    try {
      const payload = sanitizeForFirestore({ customLessons: updated, videoOverrides });
      await setDoc(doc(db, 'appData', 'shared'), payload, { merge: true });
    } catch (err) {
      console.error("Error saving to Firestore:", err);
      throw err;
    }
  };

  const deleteCustomLesson = async (lessonId: string) => {
    const lesson = customLessons.find(l => l.id === lessonId);
    if (lesson?.mp4FileId) {
      await del(lesson.mp4FileId);
    }
    if (lesson?.pdfFileId) {
      await del(lesson.pdfFileId);
    }
    const updated = customLessons.filter(l => l.id !== lessonId);
    setCustomLessons(updated);
    localStorage.setItem('cache_custom_lessons', JSON.stringify(updated));
    
    try {
      const payload = sanitizeForFirestore({ customLessons: updated, videoOverrides });
      await setDoc(doc(db, 'appData', 'shared'), payload, { merge: true });
    } catch (err) {
      console.error("Error deleting from Firestore:", err);
      throw err;
    }
  };

  const updateLessonVideo = async (lessonId: string, data: { youtubeUrlEn?: string; youtubeUrlHi?: string; mp4File?: File; pdfFile?: File }) => {
    let mp4FileId: string | undefined = undefined;
    if (data.mp4File) {
      mp4FileId = `video_override_${lessonId}_${Date.now()}`;
      await set(mp4FileId, data.mp4File);
    }
    let pdfFileId: string | undefined = undefined;
    if (data.pdfFile) {
      pdfFileId = `pdf_override_${lessonId}_${Date.now()}`;
      await set(pdfFileId, data.pdfFile);
    }
    
    const current = videoOverrides[lessonId] || {};
    const updatedOverrides = {
      ...videoOverrides,
      [lessonId]: {
        videoIdEn: data.youtubeUrlEn !== undefined ? extractYoutubeId(data.youtubeUrlEn) : (current.videoIdEn || ""),
        videoIdHi: data.youtubeUrlHi !== undefined ? extractYoutubeId(data.youtubeUrlHi) : (current.videoIdHi || ""),
        mp4FileId: mp4FileId || current.mp4FileId || "",
        pdfFileId: pdfFileId || current.pdfFileId || ""
      }
    };
    
    setVideoOverrides(updatedOverrides);
    localStorage.setItem('cache_video_overrides', JSON.stringify(updatedOverrides));
    
    try {
      const payload = sanitizeForFirestore({ customLessons, videoOverrides: updatedOverrides });
      await setDoc(doc(db, 'appData', 'shared'), payload, { merge: true });
    } catch (err) {
      console.error("Error updating video in Firestore:", err);
      throw err;
    }
  };

  const resetLessonVideo = async (lessonId: string) => {
    const current = videoOverrides[lessonId];
    if (current?.mp4FileId) {
      await del(current.mp4FileId);
    }
    if (current?.pdfFileId) {
      await del(current.pdfFileId);
    }
    const nextOverrides = { ...videoOverrides };
    delete nextOverrides[lessonId];
    
    setVideoOverrides(nextOverrides);
    localStorage.setItem('cache_video_overrides', JSON.stringify(nextOverrides));
    
    try {
      const payload = sanitizeForFirestore({ customLessons, videoOverrides: nextOverrides });
      await setDoc(doc(db, 'appData', 'shared'), payload, { merge: true });
    } catch (err) {
      console.error("Error resetting video in Firestore:", err);
      throw err;
    }
  };

  const getFileUrl = async (fileId: string): Promise<string | null> => {
    try {
      const file = await get<File>(fileId);
      if (file) {
        return URL.createObjectURL(file);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const getVideoUrl = async (fileId: string): Promise<string | null> => {
    try {
      const file = await get<File>(fileId);
      if (file) {
        return URL.createObjectURL(file);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const allCourses = useMemo(() => {
    const coursesCopy = JSON.parse(JSON.stringify(defaultCourses)); 
    
    coursesCopy.forEach((c: any) => {
      c.chapters?.forEach((ch: any) => {
        ch.lessons?.forEach((l: any) => {
          if (videoOverrides[l.id]) {
            const override = videoOverrides[l.id];
            if (override.videoIdEn !== undefined) l.videoIdEn = override.videoIdEn;
            if (override.videoIdHi !== undefined) l.videoIdHi = override.videoIdHi;
            if (override.mp4FileId !== undefined) l.mp4FileId = override.mp4FileId;
            if (override.pdfFileId !== undefined) l.pdfFileId = override.pdfFileId;
          }
        });
      });
    });

    customLessons.forEach(lesson => {
      const courseId = lesson.courseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const chapterId = lesson.chapterTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const lessonId = lesson.id;
      
      let course = coursesCopy.find((c: any) => c.id === courseId);
      if (!course) {
        course = {
          id: courseId,
          title: lesson.courseTitle,
          description: "Custom course added by educator.",
          descriptionHi: "यूजर द्वारा जोड़ा गया कोर्स।",
          level: "beginner",
          category: "custom",
          icon: "terminal",
          chapters: []
        };
        coursesCopy.push(course);
      }

      let chapter = course.chapters.find((ch: any) => ch.title === lesson.chapterTitle);
      if (!chapter) {
        chapter = {
          id: chapterId,
          title: lesson.chapterTitle,
          titleHi: lesson.chapterTitle,
          lessons: []
        };
        course.chapters.push(chapter);
      }

      const override = videoOverrides[lessonId];
      chapter.lessons.push({
        id: lessonId,
        title: lesson.lessonTitle,
        description: lesson.description,
        videoIdEn: override?.videoIdEn ?? extractYoutubeId(lesson.youtubeUrl),
        videoIdHi: override?.videoIdHi ?? extractYoutubeId(lesson.youtubeUrlHi),
        mp4FileId: override?.mp4FileId ?? lesson.mp4FileId,
        pdfFileId: override?.pdfFileId ?? lesson.pdfFileId,
        code: lesson.code || "",
        practice: lesson.practice || "",
        isCustom: true
      });
    });
    
    return coursesCopy;
  }, [customLessons, videoOverrides]);

  return (
    <AppContext.Provider value={{ 
      language, theme, progress, allCourses, customLessons, videoOverrides,
      toggleLanguage, toggleTheme, markCompleted, addCustomLesson, updateLessonVideo, deleteCustomLesson, resetLessonVideo, getVideoUrl, getFileUrl
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
