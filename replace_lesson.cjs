const fs = require('fs');
let code = fs.readFileSync('src/pages/Lesson.tsx', 'utf8');

if (!code.includes("import Markdown from 'react-markdown';")) {
  code = code.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport Markdown from 'react-markdown';");
}

const targetPdf = `        {/* PDF Notes Section */}
        {pdfUrl && (
          <div className="mb-8 p-6 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Lesson Notes (PDF)</h3>
                <p className="text-sm text-muted-foreground">Download or view the detailed notes for this topic.</p>
              </div>
            </div>
            <a 
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </div>
        )}`;

const replacementPdf = `        {/* Notes (Markdown) Section */}
        {currentLesson.notes && (
          <div className="mb-8 p-6 bg-card border border-border rounded-2xl shadow-sm">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/50">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Lesson Notes</h3>
              </div>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 markdown-body">
              <Markdown>{currentLesson.notes}</Markdown>
            </div>
          </div>
        )}

        {/* PDF Notes Section (Legacy Local Fallback) */}
        {pdfUrl && (
          <div className="mb-8 p-6 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Lesson Notes (PDF)</h3>
                <p className="text-sm text-muted-foreground">Download or view the detailed notes for this topic.</p>
              </div>
            </div>
            <a 
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </div>
        )}`;

code = code.replace(targetPdf, replacementPdf);
fs.writeFileSync('src/pages/Lesson.tsx', code);
