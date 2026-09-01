const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

const target = `      if ((actionType === 'manage_video' || actionType === 'manage_notes')) {
        if (!selectedLessonId) {
          alert('Please select a lesson first.');
          return;
        }

        await updateLessonVideo(selectedLessonId, {
          youtubeUrlEn: videoType === 'youtube' ? youtubeUrlEn : undefined,
          youtubeUrlHi: videoType === 'youtube' ? youtubeUrlHi : undefined,
          mp4File: videoType === 'mp4' && file ? file : undefined,
          notes: notes ? notes : undefined
        });

        setSuccessMsg(\`Video successfully saved for "\${activeLesson?.title || selectedLessonId}"!\`);
      }`;

const replacement = `      if ((actionType === 'manage_video' || actionType === 'manage_notes')) {
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
        setSuccessMsg(\`\${typeLabel} successfully saved for "\${activeLesson?.title || selectedLessonId}"!\`);
      }`;

code = code.replace(target, replacement);
fs.writeFileSync('src/pages/Settings.tsx', code);
