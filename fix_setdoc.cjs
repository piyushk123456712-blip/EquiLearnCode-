const fs = require('fs');
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

// Replace await setDoc with just setDoc(...).catch(...)
code = code.replace(/await setDoc\(doc\(db, 'appData', 'shared'\), payload, \{ merge: true \}\);/g, 
  "setDoc(doc(db, 'appData', 'shared'), payload, { merge: true }).catch(err => console.error('Firestore background sync error:', err));");

fs.writeFileSync('src/context/AppContext.tsx', code);
