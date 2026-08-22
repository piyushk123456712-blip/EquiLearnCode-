const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf-8');

content = content.replace('home: "Home",', 'home: "Home",\n    compiler: "Compiler",');
content = content.replace('home: "होम",', 'home: "होम",\n    compiler: "कंपाइलर",');

fs.writeFileSync('src/data/translations.ts', content);
