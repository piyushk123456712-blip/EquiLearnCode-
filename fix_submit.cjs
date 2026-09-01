const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

code = code.replace(
  'await updateLessonVideo(selectedLessonId, payload);',
  'updateLessonVideo(selectedLessonId, payload).catch(console.error);'
);

code = code.replace(
  'await addCustomLesson({',
  'addCustomLesson({'
);

code = code.replace(
  '}, file || undefined, pdfFile || undefined);',
  '}, file || undefined, pdfFile || undefined).catch(console.error);'
);

fs.writeFileSync('src/pages/Settings.tsx', code);
