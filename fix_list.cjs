const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

code = code.replace(
  "Active Video Overrides & Custom Lessons",
  "Active Content Overrides & Custom Lessons"
);
code = code.replace(
  "{override.mp4FileId && <span>MP4: <code className=\"bg-secondary px-1 py-0.5 rounded\">{override.mp4FileId}</code></span>}",
  "{override.mp4FileId && <span>MP4: <code className=\"bg-secondary px-1 py-0.5 rounded\">{override.mp4FileId}</code></span>}\n                    {override.notes && <span className=\"text-emerald-500\">Written Notes Added</span>}\n                    {override.pdfFileId && <span className=\"text-emerald-500\">PDF Uploaded</span>}"
);
code = code.replace(
  "No custom video overrides active",
  "No custom content overrides active"
);

fs.writeFileSync('src/pages/Settings.tsx', code);
