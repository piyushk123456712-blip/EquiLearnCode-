const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

const target = `          {/* Step 4: Notes (PDF Upload) */}
          <div className="p-5 bg-card border border-border rounded-xl space-y-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              4. Upload Notes (PDF)
            </h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background hover:bg-accent/40 transition-colors">
              <input 
                type="file" 
                accept="application/pdf"
                className="hidden" 
                id="pdf-file-input"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setPdfFile(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="pdf-file-input" className="cursor-pointer flex flex-col items-center">
                <BookOpen className="w-10 h-10 text-primary mb-2" />
                <span className="text-foreground font-semibold text-sm">
                  {pdfFile ? pdfFile.name : "Click to browse and upload PDF notes"}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Optional: Provide downloadable notes for this lesson
                </span>
              </label>
            </div>
          </div>`;

const replacement = `          {/* Step 4: Notes (Cloud Synced) */}
          <div className="p-5 bg-card border border-border rounded-xl space-y-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              4. Written Notes (Cloud Synced)
            </h3>
            <p className="text-sm text-muted-foreground">
              Type or paste your lesson notes here. These notes will sync securely to the server and appear below the video on the lesson page.
            </p>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="# Lesson Notes\n\nStart typing your notes here using Markdown..."
              className="w-full bg-background border border-border rounded-xl p-4 text-foreground focus:ring-2 focus:ring-primary focus:outline-none min-h-[200px]"
            />
          </div>
          
          {/* Fallback Legacy PDF Upload */}
          <div className="p-5 bg-card border border-border rounded-xl space-y-6 mt-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground">
              Upload PDF (Local Storage Only)
            </h3>
            <p className="text-xs text-muted-foreground">Note: Large PDFs will only save locally to this browser.</p>
            <div className="border border-dashed border-border rounded-xl p-4 text-center bg-background hover:bg-accent/40 transition-colors">
              <input 
                type="file" 
                accept="application/pdf"
                className="hidden" 
                id="pdf-file-input"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setPdfFile(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="pdf-file-input" className="cursor-pointer flex flex-col items-center">
                <span className="text-foreground font-semibold text-sm">
                  {pdfFile ? pdfFile.name : "Select PDF file"}
                </span>
              </label>
            </div>
          </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/pages/Settings.tsx', code);
