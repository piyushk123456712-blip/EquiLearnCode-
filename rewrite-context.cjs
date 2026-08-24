const fs = require("fs");
let code = fs.readFileSync("src/context/AppContext.tsx", "utf8");

// Imports
code = code.replace(
  "import { get, set, del } from 'idb-keyval';",
  `import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';\nimport { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';\nimport { db, storage } from '../lib/firebase';`
);

// Remove local storage initialization for customLessons and videoOverrides
code = code.replace(
  /const \[customLessons, setCustomLessons\] = useState<CustomLesson\[\]>\(\(\) => \{[\s\S]*?\}\);/,
  "const [customLessons, setCustomLessons] = useState<CustomLesson[]>([]);"
);

code = code.replace(
  /const \[videoOverrides, setVideoOverrides\] = useState<Record<string, VideoOverride>>\(\(\) => \{[\s\S]*?\}\);/,
  "const [videoOverrides, setVideoOverrides] = useState<Record<string, VideoOverride>>({});"
);

// Remove local storage effect for videoOverrides
code = code.replace(
  /useEffect\(\(\) => \{\s*localStorage\.setItem\('videoOverrides', JSON\.stringify\(videoOverrides\)\);\s*\}, \[videoOverrides\]\);/,
  ""
);

// Add onSnapshot effect
const snapshotEffect = `
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'appData', 'shared'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.customLessons) setCustomLessons(data.customLessons);
        if (data.videoOverrides) setVideoOverrides(data.videoOverrides);
      }
    });
    return () => unsub();
  }, []);
`;
code = code.replace(/const toggleLanguage = \(\) => \{/, snapshotEffect + "\n  const toggleLanguage = () => {");

// helper to upload file
const uploadFileHelper = `
  const uploadToStorage = async (file: File, path: string) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };
`;
code = code.replace(/const addCustomLesson = async /, uploadFileHelper + "\n  const addCustomLesson = async ");

// Replace addCustomLesson body
code = code.replace(
  /const addCustomLesson = async \(lesson: CustomLesson, file\?: File, pdfFile\?: File\) => \{[\s\S]*?localStorage\.setItem\('customLessons', JSON\.stringify\(updated\)\);\s*\};/,
  `const addCustomLesson = async (lesson: CustomLesson, file?: File, pdfFile?: File) => {
    let mp4Url = lesson.mp4FileId;
    let pdfUrl = lesson.pdfFileId;
    if (file) {
      mp4Url = await uploadToStorage(file, \`videos/\${lesson.id}_\${Date.now()}\`);
    }
    if (pdfFile) {
      pdfUrl = await uploadToStorage(pdfFile, \`pdfs/\${lesson.id}_\${Date.now()}\`);
    }
    const finalLesson = { ...lesson, mp4FileId: mp4Url, pdfFileId: pdfUrl };
    const updated = [...customLessons, finalLesson];
    await setDoc(doc(db, 'appData', 'shared'), { customLessons: updated, videoOverrides }, { merge: true });
  };`
);

// Replace deleteCustomLesson body
code = code.replace(
  /const deleteCustomLesson = async \(lessonId: string\) => \{[\s\S]*?localStorage\.setItem\('customLessons', JSON\.stringify\(updated\)\);\s*\};/,
  `const deleteCustomLesson = async (lessonId: string) => {
    const updated = customLessons.filter(l => l.id !== lessonId);
    await setDoc(doc(db, 'appData', 'shared'), { customLessons: updated, videoOverrides }, { merge: true });
  };`
);

// Replace updateLessonVideo body
code = code.replace(
  /const updateLessonVideo = async \(lessonId: string, data: \{[\s\S]*?return updated;\n    \}\);\s*\};/,
  `const updateLessonVideo = async (lessonId: string, data: { youtubeUrlEn?: string; youtubeUrlHi?: string; mp4File?: File; pdfFile?: File }) => {
    const current = videoOverrides[lessonId] || {};
    let mp4Url = current.mp4FileId;
    let pdfUrl = current.pdfFileId;
    
    if (data.mp4File) {
      mp4Url = await uploadToStorage(data.mp4File, \`videos/override_\${lessonId}_\${Date.now()}\`);
    }
    if (data.pdfFile) {
      pdfUrl = await uploadToStorage(data.pdfFile, \`pdfs/override_\${lessonId}_\${Date.now()}\`);
    }
    
    const updatedOverrides = {
      ...videoOverrides,
      [lessonId]: {
        videoIdEn: data.youtubeUrlEn !== undefined ? extractYoutubeId(data.youtubeUrlEn) : current.videoIdEn,
        videoIdHi: data.youtubeUrlHi !== undefined ? extractYoutubeId(data.youtubeUrlHi) : current.videoIdHi,
        mp4FileId: mp4Url,
        pdfFileId: pdfUrl
      }
    };
    
    await setDoc(doc(db, 'appData', 'shared'), { customLessons, videoOverrides: updatedOverrides }, { merge: true });
  };`
);

// Replace resetLessonVideo body
code = code.replace(
  /const resetLessonVideo = async \(lessonId: string\) => \{[\s\S]*?return next;\n    \}\);\s*\};/,
  `const resetLessonVideo = async (lessonId: string) => {
    const nextOverrides = { ...videoOverrides };
    delete nextOverrides[lessonId];
    await setDoc(doc(db, 'appData', 'shared'), { customLessons, videoOverrides: nextOverrides }, { merge: true });
  };`
);

// Replace getFileUrl & getVideoUrl
code = code.replace(
  /const getFileUrl = async \(fileId: string\): Promise<string \| null> => \{[\s\S]*?return null;\n  \};/,
  `const getFileUrl = async (fileId: string): Promise<string | null> => {
    if (fileId && fileId.startsWith('http')) return fileId;
    return null;
  };`
);

code = code.replace(
  /const getVideoUrl = async \(fileId: string\): Promise<string \| null> => \{[\s\S]*?return null;\n  \};/,
  `const getVideoUrl = async (fileId: string): Promise<string | null> => {
    if (fileId && fileId.startsWith('http')) return fileId;
    return null;
  };`
);

fs.writeFileSync("src/context/AppContext.tsx", code);
