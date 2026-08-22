const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

if (!content.includes('import { Compiler }')) {
  content = content.replace("import { Settings } from './pages/Settings';", "import { Settings } from './pages/Settings';\nimport { Compiler } from './pages/Compiler';");
  
  content = content.replace('<Route path="/settings" element={<Settings />} />', '<Route path="/settings" element={<Settings />} />\n              <Route path="/compiler" element={<Compiler />} />');
  
  fs.writeFileSync('src/App.tsx', content);
}
