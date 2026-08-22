import React from 'react';
import { Terminal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';

export const Compiler = () => {
  const { language } = useAppContext();
  const t = translations[language] as any;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full">
      <div className="bg-card border-b border-border p-4 flex items-center gap-3 shrink-0">
        <Terminal className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">{t.compiler || 'All-in-One Compiler'}</h1>
      </div>
      <div className="flex-1 w-full relative">
        <iframe 
          src="https://onecompiler.com/embed/" 
          width="100%" 
          height="100%" 
          frameBorder="0"
          className="absolute inset-0"
          title="All-in-One Compiler"
          allow="clipboard-write"
        ></iframe>
      </div>
    </div>
  );
};
