const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

const regexToRemove = /<\/div>\s*<span className="text-xs text-muted-foreground">\s*Add\/update Hindi & English video for an existing course lesson\.\s*<\/span>\s*<\/button>[\s\S]*?Create a completely new programming course from scratch\.\s*<\/span>\s*<\/button>\s*<\/div>\s*<\/div>/;

code = code.replace(regexToRemove, "</div></div>");
fs.writeFileSync('src/pages/Settings.tsx', code);
