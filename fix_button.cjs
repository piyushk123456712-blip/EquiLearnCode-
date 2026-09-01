const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

const targetBtn = `<><CheckCircle2 className="w-5 h-5" /> Save & Publish Video</>`;
const replacementBtn = `<><CheckCircle2 className="w-5 h-5" /> {actionType === 'manage_notes' ? 'Save Notes' : (actionType === 'new_lesson' ? 'Publish New Lesson' : 'Save Video')}</>`;

code = code.replace(targetBtn, replacementBtn);
fs.writeFileSync('src/pages/Settings.tsx', code);
