const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

code = code.replace(
  'const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("admin_auth") === "true");',
  'const [isAuthenticated, setIsAuthenticated] = useState(false);'
);

code = code.replace(
  'localStorage.setItem("admin_auth", "true");',
  '// Session-only auth, requires password on every visit'
);

fs.writeFileSync('src/pages/Settings.tsx', code);
