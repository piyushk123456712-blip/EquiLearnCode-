const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

const target = `  const links = [
    { name: t.home, path: '/' },
    { name: (t as any).compiler || 'Compiler', path: '/compiler' },
    { name: t.courses, path: '/courses' },
    { name: t.roadmaps, path: '/roadmaps' },
    { name: t.projects, path: '/projects' },
    { name: t.about, path: '/about' },
  ];`;

const replacement = `  const links = [
    { name: t.home, path: '/' },
    { name: (t as any).compiler || 'Compiler', path: '/compiler' },
    { name: t.courses, path: '/courses' },
    { name: t.roadmaps, path: '/roadmaps' },
    { name: t.projects, path: '/projects' },
    { name: t.about, path: '/about' },
    { name: 'Upload Notes (Admin)', path: '/settings' },
  ];`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/layout/Navbar.tsx', code);
