const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf-8');

content = content.replace("{ name: t.home, path: '/' },", "{ name: t.home, path: '/' },\n    { name: (t as any).compiler || 'Compiler', path: '/compiler' },");

fs.writeFileSync('src/components/layout/Navbar.tsx', content);
