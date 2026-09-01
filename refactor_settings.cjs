const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

// We will change the targetType choices
// From: 'existing' | 'new_lesson' | 'new_course'
// To: 'manage_video' | 'manage_notes' | 'new_lesson'

code = code.replace(
  "const [targetType, setTargetType] = useState<'existing' | 'new_lesson' | 'new_course'>('existing');",
  "const [actionType, setActionType] = useState<'manage_video' | 'manage_notes' | 'new_lesson'>('manage_video');"
);

// Replace usages of targetType
code = code.replace(/targetType === 'existing'/g, "(actionType === 'manage_video' || actionType === 'manage_notes')");
code = code.replace(/targetType === 'new_lesson'/g, "actionType === 'new_lesson'");
code = code.replace(/targetType === 'new_course'/g, "false /* disabled new_course for simplicity */");
code = code.replace(/targetType !== 'existing'/g, "actionType === 'new_lesson'");
code = code.replace(/targetType === 'manage_video'/g, "actionType === 'manage_video'"); // just in case
code = code.replace(/setTargetType/g, "setActionType");
code = code.replace(/targetType/g, "actionType");

// Modify the submit handler
// Specifically around line 98
// if (actionType === 'manage_video' || actionType === 'manage_notes') {
const submitTarget = `      if ((actionType === 'manage_video' || actionType === 'manage_notes')) {
        if (!selectedLessonId) {
          alert('Please select a lesson first.');
          setLoading(false);
          return;
        }

        await updateLessonVideo(selectedLessonId, {
          youtubeUrlEn: videoType === 'youtube' ? youtubeUrlEn : undefined,
          youtubeUrlHi: videoType === 'youtube' ? youtubeUrlHi : undefined,
          mp4File: videoType === 'mp4' && file ? file : undefined,
          notes: notes ? notes : undefined
        });`;

const newSubmitTarget = `      if (actionType === 'manage_video' || actionType === 'manage_notes') {
        if (!selectedLessonId) {
          alert('Please select a lesson first.');
          setLoading(false);
          return;
        }

        const updateData: any = {};
        if (actionType === 'manage_video') {
          updateData.youtubeUrlEn = videoType === 'youtube' ? youtubeUrlEn : undefined;
          updateData.youtubeUrlHi = videoType === 'youtube' ? youtubeUrlHi : undefined;
          updateData.mp4File = videoType === 'mp4' && file ? file : undefined;
        } else if (actionType === 'manage_notes') {
          updateData.notes = notes ? notes : undefined;
          updateData.pdfFile = pdfFile ? pdfFile : undefined;
        }

        await updateLessonVideo(selectedLessonId, updateData);`;

code = code.replace(
`      if ((actionType === 'manage_video' || actionType === 'manage_notes')) {
        if (!selectedLessonId) {
          alert('Please select a lesson first.');
          setLoading(false);
          return;
        }

        await updateLessonVideo(selectedLessonId, {
          youtubeUrlEn: videoType === 'youtube' ? youtubeUrlEn : undefined,
          youtubeUrlHi: videoType === 'youtube' ? youtubeUrlHi : undefined,
          mp4File: videoType === 'mp4' && file ? file : undefined,
          notes: notes ? notes : undefined
        });`, 
newSubmitTarget);

// The buttons for mode selection
const buttonsTarget = `<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setActionType('manage_video')}
                className={\`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 \${
                  (actionType === 'manage_video' || actionType === 'manage_notes')
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border bg-background hover:bg-accent/40'
                }\`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <Film className="w-4 h-4 text-primary" />
                  Add Video to Language
                </div>
                <span className="text-xs text-muted-foreground">
                  Add/update Hindi & English video for an existing course lesson.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActionType('new_lesson')}
                className={\`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 \${
                  actionType === 'new_lesson'
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border bg-background hover:bg-accent/40'
                }\`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <Plus className="w-4 h-4 text-primary" />
                  Add New Lesson
                </div>
                <span className="text-xs text-muted-foreground">
                  Add a new lesson topic to an existing language course.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActionType('new_course')}
                className={\`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 \${
                  false /* disabled new_course for simplicity */
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border bg-background hover:bg-accent/40'
                }\`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Create Custom Course
                </div>
                <span className="text-xs text-muted-foreground">
                  Start a completely new language course from scratch.
                </span>
              </button>
            </div>`;

const newButtonsTarget = `<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setActionType('manage_video')}
                className={\`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 \${
                  actionType === 'manage_video'
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border bg-background hover:bg-accent/40'
                }\`}
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
                className={\`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 \${
                  actionType === 'manage_notes'
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border bg-background hover:bg-accent/40'
                }\`}
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
                className={\`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 \${
                  actionType === 'new_lesson'
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border bg-background hover:bg-accent/40'
                }\`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <Plus className="w-4 h-4 text-primary" />
                  Add New Lesson
                </div>
                <span className="text-xs text-muted-foreground">
                  Create a completely new lesson topic for a programming language.
                </span>
              </button>
            </div>`;

code = code.replace(/<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">[\s\S]*?<\/div>/, newButtonsTarget);

fs.writeFileSync('src/pages/Settings.tsx', code);
