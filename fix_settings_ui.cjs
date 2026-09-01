const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

const target = `            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground">
              Upload PDF (Local Storage Only)
            </h3>
            <p className="text-xs text-muted-foreground">Note: Large PDFs will only save locally to this browser.</p>`;

const replacement = `            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground">
              Upload PDF Notes (Cloud Synced)
            </h3>
            <p className="text-xs text-muted-foreground">Upload your PDF here. It will be securely saved to Firebase Cloud Storage and sync across all your devices.</p>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/pages/Settings.tsx', code);
