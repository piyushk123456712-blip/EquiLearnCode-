import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  Settings as SettingsIcon, 
  Upload, 
  Video, 
  Plus, 
  Link as LinkIcon, 
  CheckCircle2, 
  BookOpen, 
  Film, 
  Sparkles, 
  ExternalLink,
  Trash2,
  RefreshCw
} from 'lucide-react';

export const Settings = () => {
  const { 
    allCourses, 
    addCustomLesson, 
    updateLessonVideo, 
    videoOverrides, 
    resetLessonVideo,
    deleteCustomLesson,
    customLessons 
  } = useAppContext();
  
  // Selection States
  const [actionType, setActionType] = useState<'manage_video' | 'manage_notes' | 'new_lesson'>('manage_video');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(() => allCourses[0]?.id || 'python');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  
  // New Course / Lesson fields
  const [customCourseTitle, setCustomCourseTitle] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [description, setDescription] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [practiceProblem, setPracticeProblem] = useState('');

  // Video Source states
  const [videoType, setVideoType] = useState<'youtube' | 'mp4'>('youtube');
  const [youtubeUrlHi, setYoutubeUrlHi] = useState('');
  const [youtubeUrlEn, setYoutubeUrlEn] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Get selected course object
  const currentCourse = useMemo(() => {
    return allCourses.find(c => c.id === selectedCourseId) || allCourses[0];
  }, [allCourses, selectedCourseId]);

  // Flatten lessons for selected course
  const courseLessons = useMemo(() => {
    if (!currentCourse) return [];
    return currentCourse.chapters?.flatMap((ch: any) => 
      ch.lessons?.map((l: any) => ({
        ...l,
        chapterTitle: ch.title
      }))
    ) || [];
  }, [currentCourse]);

  // Auto-select first lesson when course changes
  React.useEffect(() => {
    if (courseLessons.length > 0 && (!selectedLessonId || !courseLessons.some((l: any) => l.id === selectedLessonId))) {
      setSelectedLessonId(courseLessons[0].id);
    }
  }, [courseLessons, selectedLessonId]);

  // Find currently selected lesson details
  const activeLesson = useMemo(() => {
    return courseLessons.find((l: any) => l.id === selectedLessonId);
  }, [courseLessons, selectedLessonId]);

  // Pre-fill existing URLs when activeLesson changes
  React.useEffect(() => {
    if ((actionType === 'manage_video' || actionType === 'manage_notes') && activeLesson) {
      setYoutubeUrlHi(activeLesson.videoIdHi ? `https://youtu.be/${activeLesson.videoIdHi}` : '');
      setYoutubeUrlEn(activeLesson.videoIdEn ? `https://youtu.be/${activeLesson.videoIdEn}` : '');
    }
  }, [activeLesson, actionType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      if ((actionType === 'manage_video' || actionType === 'manage_notes')) {
        if (!selectedLessonId) {
          alert('Please select a lesson first.');
          return;
        }

        const payload: any = {};
        if (actionType === 'manage_video') {
          payload.youtubeUrlEn = videoType === 'youtube' ? youtubeUrlEn : undefined;
          payload.youtubeUrlHi = videoType === 'youtube' ? youtubeUrlHi : undefined;
          payload.mp4File = videoType === 'mp4' && file ? file : undefined;
        } else if (actionType === 'manage_notes') {
          payload.notes = notes ? notes : undefined;
          payload.pdfFile = pdfFile ? pdfFile : undefined;
        }

        await updateLessonVideo(selectedLessonId, payload);
        const typeLabel = actionType === 'manage_video' ? 'Video' : 'Notes';
        setSuccessMsg(`${typeLabel} successfully saved for "${activeLesson?.title || selectedLessonId}"!`);
      } else {
        // Adding new lesson or course
        const effectiveCourseTitle = false /* disabled new_course for simplicity */ ? customCourseTitle : (currentCourse?.title || 'Programming');
        const id = crypto.randomUUID();
        const mp4FileId = videoType === 'mp4' && file ? `video_${id}` : undefined;

        await addCustomLesson({
          id,
          courseTitle: effectiveCourseTitle,
          chapterTitle: chapterTitle || "General",
          lessonTitle: lessonTitle || "New Lesson",
          description: description || "",
          youtubeUrl: videoType === 'youtube' ? youtubeUrlEn : undefined,
          youtubeUrlHi: videoType === 'youtube' ? youtubeUrlHi : undefined,
          mp4FileId,
          code: codeSnippet,
          practice: practiceProblem,
          notes: notes,
          pdfFileId: pdfFile ? `pdf_${id}` : undefined
        }, file || undefined, pdfFile || undefined);

        setSuccessMsg(`New lesson "${lessonTitle}" created in ${effectiveCourseTitle}!`);
        
        // Reset fields
        setLessonTitle('');
        setDescription('');
        setCodeSnippet('');
        setPracticeProblem('');
        setYoutubeUrlEn('');
        setYoutubeUrlHi('');
        setFile(null);
        setPdfFile(null);
        setNotes('');
      }

      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Failed to save changes.');
    } finally {
      setLoading(false);
    }
  };

  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md flex flex-col items-center">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm w-full text-center">
          <SettingsIcon className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Admin Login</h2>
          <p className="text-muted-foreground text-sm mb-6">Please enter the admin password to access the studio.</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === "TeenoAdmin@2026!") {
              // Session-only auth, requires password on every visit
              setIsAuthenticated(true);
            } else {
              setLoginError("Incorrect password. Please try again.");
            }
          }}>
            <input 
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground mb-4 focus:ring-2 focus:ring-primary focus:outline-none text-center"
            />
            {loginError && <p className="text-red-500 text-xs mb-3">{loginError}</p>}
            <button type="submit" className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all">
              Login to Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Studio & Video Manager</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Select any programming language to upload videos or add new lessons.
          </p>
        </div>

        <Link 
          to="/courses" 
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors self-start"
        >
          <BookOpen className="w-4 h-4 text-primary" />
          View All Courses
        </Link>
      </div>

      {/* Main Settings Card */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Mode Selection Tabs */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              1. What would you like to do?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setActionType('manage_video')}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                  actionType === 'manage_video'
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border bg-background hover:bg-accent/40'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <Film className="w-4 h-4 text-primary" />
                  Upload Videos
                </div>
                <span className="text-xs text-muted-foreground">
                  Add or update videos for an existing programming language lesson.
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => setActionType('manage_notes')}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                  actionType === 'manage_notes'
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border bg-background hover:bg-accent/40'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Upload Notes
                </div>
                <span className="text-xs text-muted-foreground">
                  Add or update PDF or Written notes for an existing lesson.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActionType('new_lesson')}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                  actionType === 'new_lesson'
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border bg-background hover:bg-accent/40'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <Plus className="w-4 h-4 text-primary" />
                  Add New Lesson
                </div>
                <span className="text-xs text-muted-foreground">
                  Create a completely new lesson topic for a programming language.
                </span>
              </button>
            </div></div>

          {/* Step 2: Language & Lesson Selection */}
          <div className="p-5 bg-accent/20 border border-border rounded-xl space-y-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              2. Select Programming Language & Topic
            </h3>

            {false /* disabled new_course for simplicity */ ? (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">New Course / Language Name</label>
                <input 
                  required
                  type="text"
                  placeholder="e.g. Flutter & Dart, DevOps, Cyber Security..."
                  value={customCourseTitle}
                  onChange={e => setCustomCourseTitle(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Select Programming Language (Course)</label>
                  <select
                    value={selectedCourseId}
                    onChange={e => setSelectedCourseId(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    {allCourses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.title} ({course.chapters?.flatMap((ch: any) => ch.lessons)?.length || 0} lessons)
                      </option>
                    ))}
                  </select>
                </div>

                {(actionType === 'manage_video' || actionType === 'manage_notes') && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Select Lesson</label>
                    <select
                      value={selectedLessonId}
                      onChange={e => setSelectedLessonId(e.target.value)}
                      className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      {courseLessons.map((lesson: any) => {
                        const hasVideo = lesson.videoIdHi || lesson.videoIdEn || lesson.mp4FileId;
                        return (
                          <option key={lesson.id} value={lesson.id}>
                            {lesson.title} {hasVideo ? '✓ (Video Present)' : '— (No Video Yet)'}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* If adding new lesson, show title inputs */}
            {actionType === 'new_lesson' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Chapter / Module Title</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. Core Fundamentals, Functions, OOP..."
                    value={chapterTitle}
                    onChange={e => setChapterTitle(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Lesson Title</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. 01 — Introduction & Setup"
                    value={lessonTitle}
                    onChange={e => setLessonTitle(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Lesson Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Brief description of what is taught in this lesson..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Currently Selected Lesson Status */}
            {(actionType === 'manage_video' || actionType === 'manage_notes') && activeLesson && (
              <div className="flex items-center justify-between p-3.5 bg-background rounded-lg border border-border/80 text-sm">
                <div>
                  <div className="font-semibold text-foreground">{activeLesson.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Course: <span className="font-medium text-foreground">{currentCourse?.title}</span> • Chapter: <span className="font-medium text-foreground">{activeLesson.chapterTitle}</span>
                  </div>
                </div>
                <Link
                  to={`/courses/${currentCourse?.id}/lessons/${activeLesson.id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline px-3 py-1.5 bg-primary/10 rounded-md"
                >
                  Preview Lesson <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>

          {(actionType === 'manage_video' || actionType === 'new_lesson') && (
            <>
          {/* Step 3: Video URLs / File Upload */}
          <div className="p-5 bg-card border border-border rounded-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                3. Video Source (YouTube or MP4)
              </h3>
              
              <div className="flex bg-secondary rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setVideoType('youtube')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    videoType === 'youtube' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" /> YouTube Links
                </button>
                <button
                  type="button"
                  onClick={() => setVideoType('mp4')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    videoType === 'mp4' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" /> Upload File (.mp4)
                </button>
              </div>
            </div>

            {videoType === 'youtube' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    हिन्दी Video Link (YouTube)
                  </label>
                  <input 
                    type="url"
                    placeholder="https://youtu.be/... or https://youtube.com/watch?v=..."
                    value={youtubeUrlHi}
                    onChange={e => setYoutubeUrlHi(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Hindi audio version of this lesson video.
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    English Video Link (YouTube)
                  </label>
                  <input 
                    type="url"
                    placeholder="https://youtu.be/... or https://youtube.com/watch?v=..."
                    value={youtubeUrlEn}
                    onChange={e => setYoutubeUrlEn(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    English audio version of this lesson video.
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Video File (.mp4, .webm)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background hover:bg-accent/40 transition-colors">
                  <input 
                    type="file" 
                    accept="video/mp4,video/webm"
                    className="hidden" 
                    id="video-file-input"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="video-file-input" className="cursor-pointer flex flex-col items-center">
                    <Video className="w-10 h-10 text-primary mb-2" />
                    <span className="text-foreground font-semibold text-sm">
                      {file ? file.name : "Click to browse and upload video file"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      MP4 or WebM video file supported
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          
                     </>
          )}
          
          {(actionType === 'manage_notes' || actionType === 'new_lesson') && (
            <>
          {/* Step 4: Notes (Cloud Synced) */}
          <div className="p-5 bg-card border border-border rounded-xl space-y-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              4. Written Notes (Cloud Synced)
            </h3>
            <p className="text-sm text-muted-foreground">
              Type or paste your lesson notes here. These notes will sync securely to the server and appear below the video on the lesson page.
            </p>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="# Lesson Notes

Start typing your notes here using Markdown..."
              className="w-full bg-background border border-border rounded-xl p-4 text-foreground focus:ring-2 focus:ring-primary focus:outline-none min-h-[200px]"
            />
          </div>
          
          {/* Fallback Legacy PDF Upload */}
          <div className="p-5 bg-card border border-border rounded-xl space-y-6 mt-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground">
              Upload PDF Notes (Cloud Synced)
            </h3>
            <p className="text-xs text-muted-foreground">Upload your PDF here. It will be securely saved to Firebase Cloud Storage and sync across all your devices.</p>
            <div className="border border-dashed border-border rounded-xl p-4 text-center bg-background hover:bg-accent/40 transition-colors">
              <input 
                type="file" 
                accept="application/pdf"
                className="hidden" 
                id="pdf-file-input"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setPdfFile(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="pdf-file-input" className="cursor-pointer flex flex-col items-center">
                <span className="text-foreground font-semibold text-sm">
                  {pdfFile ? pdfFile.name : "Select PDF file"}
                </span>
              </label>
            </div>
          </div>


                      </>
          )}

          {/* Success Banner */}
          {successMsg && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              {successMsg}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 h-12 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 text-base"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <><CheckCircle2 className="w-5 h-5" /> {actionType === 'manage_notes' ? 'Save Notes' : (actionType === 'new_lesson' ? 'Publish New Lesson' : 'Save Video')}</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Custom & Overridden Videos Management List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Film className="w-5 h-5 text-primary" />
          Active Content Overrides & Custom Lessons
        </h2>

        {Object.keys(videoOverrides).length === 0 && customLessons.length === 0 ? (
          <div className="p-8 border border-dashed border-border rounded-2xl text-center bg-card">
            <Film className="w-10 h-10 mx-auto text-muted-foreground/40 mb-2" />
            <p className="text-sm font-semibold text-foreground">No custom content overrides active</p>
            <p className="text-xs text-muted-foreground mt-1">
              Select any language above to attach your YouTube videos or upload MP4 files.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(videoOverrides).map(([lessonId, override]: [string, any]) => (
              <div key={lessonId} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                <div>
                  <div className="font-semibold text-foreground text-sm">{lessonId}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-3">
                    {override.videoIdHi && <span>Hindi: <code className="bg-secondary px-1 py-0.5 rounded">{override.videoIdHi}</code></span>}
                    {override.videoIdEn && <span>English: <code className="bg-secondary px-1 py-0.5 rounded">{override.videoIdEn}</code></span>}
                    {override.mp4FileId && <span>MP4: <code className="bg-secondary px-1 py-0.5 rounded">{override.mp4FileId}</code></span>}
                    {override.notes && <span className="text-emerald-500">Written Notes Added</span>}
                    {override.pdfFileId && <span className="text-emerald-500">PDF Uploaded</span>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => resetLessonVideo(lessonId)}
                  className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove video override"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {customLessons.map(lesson => (
              <div key={lesson.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                <div>
                  <div className="font-semibold text-foreground text-sm">{lesson.lessonTitle}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Course: <span className="font-medium text-foreground">{lesson.courseTitle}</span> • Chapter: <span className="font-medium text-foreground">{lesson.chapterTitle}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteCustomLesson(lesson.id)}
                  className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete custom lesson"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
