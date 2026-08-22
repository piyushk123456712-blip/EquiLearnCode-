const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace("import { Terms } from './pages/Terms';", "import { Terms } from './pages/Terms';\nimport { Settings } from './pages/Settings';");

content = content.replace("<Route path=\"/terms\" element={<Terms />} />", "<Route path=\"/terms\" element={<Terms />} />\n              <Route path=\"/settings\" element={<Settings />} />");

fs.writeFileSync('src/App.tsx', content);
