import React, { useEffect, useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { BookOpen, Download, FileText, Search, Library } from 'lucide-react';

export const Notes = () => {
  const { allCourses, getFileUrl } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create a flattened list of all notes
  const availableNotes = useMemo(() => {
    const notesList: any[] = [];
    allCourses.forEach(course => {
      course.chapters?.forEach((ch: any) => {
        ch.lessons?.forEach((lesson: any) => {
          if (lesson.pdfFileId || lesson.notes) {
            notesList.push({
              courseTitle: course.title,
              chapterTitle: ch.title,
              lessonTitle: lesson.title,
              pdfFileId: lesson.pdfFileId,
              textNotes: lesson.notes,
              id: lesson.id
            });
          }
        });
      });
    });
    return notesList;
  }, [allCourses]);

  const filteredNotes = availableNotes.filter(note => 
    note.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-4">
          <Library className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">Study Notes Archive</h1>
        <p className="text-lg text-muted-foreground">
          Access and download PDF notes for all programming languages and topics in one place.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search for notes by language or topic..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-14 pl-12 pr-4 bg-card border border-border rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"
        />
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center p-12 bg-card border border-dashed border-border rounded-2xl">
          <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">No notes found</h3>
          <p className="text-muted-foreground mt-1">Try a different search term or check back later when new notes are added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note, index) => (
            <NoteCard key={`${note.id}-${index}`} note={note} getFileUrl={getFileUrl} />
          ))}
        </div>
      )}
    </div>
  );
};

const NoteCard = ({ note, getFileUrl }: { note: any, getFileUrl: any, key?: string }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (note.pdfFileId) {
      getFileUrl(note.pdfFileId).then((url: string) => setPdfUrl(url));
    }
  }, [note.pdfFileId, getFileUrl]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="mb-4">
        <div className="inline-flex px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider mb-3">
          {note.courseTitle}
        </div>
        <h3 className="text-lg font-bold text-foreground leading-tight mb-1 line-clamp-2" title={note.lessonTitle}>
          {note.lessonTitle}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{note.chapterTitle}</p>
      </div>
      
      <div className="mt-auto pt-4 border-t border-border">
        {pdfUrl ? (
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        ) : note.textNotes ? (
           <div className="flex items-center justify-center gap-2 w-full py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-xl">
             <FileText className="w-4 h-4" /> Text Notes
           </div>
        ) : null}
      </div>
    </div>
  );
};
