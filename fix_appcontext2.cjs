const fs = require('fs');
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

code = code.replace(/notes\?: string;\s*objectives\?: string\[\];\s*notes\?: string;/g, 'objectives?: string[];\n  notes?: string;');
fs.writeFileSync('src/context/AppContext.tsx', code);
