const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

// Wrap Step 3
code = code.replace(
  /{[\s]*\/\* Step 3: Video URLs \/ File Upload \*\/}/,
  `{(actionType === 'manage_video' || actionType === 'new_lesson') && (\n            <>\n          {/* Step 3: Video URLs / File Upload */}`
);

// End of Step 3 is just before Step 4
code = code.replace(
  /{[\s]*\/\* Step 4: Notes \(Cloud Synced\) \*\/}/,
  `           </>\n          )}\n          \n          {(actionType === 'manage_notes' || actionType === 'new_lesson') && (\n            <>\n          {/* Step 4: Notes (Cloud Synced) */}`
);

// End of Step 4 is just before Success Banner
code = code.replace(
  /{[\s]*\/\* Success Banner \*\/}/,
  `            </>\n          )}\n\n          {/* Success Banner */}`
);

fs.writeFileSync('src/pages/Settings.tsx', code);
