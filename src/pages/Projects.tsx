import { FolderGit2, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';
import { projects } from '../data/courses';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { useSEO } from '../hooks/useSEO';

export const Projects = () => {
  const { language } = useAppContext();
  const t = translations[language];

  useSEO({
    title: t.projects,
    description: 'Apply your knowledge by building practical, real-world coding projects.'
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">{t.projects}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Apply your knowledge by building practical, real-world coding projects.
        </p>
      </div>

      <AdPlaceholder type="banner" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {projects.map(project => (
          <div key={project.id} className="bg-card border border-border rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                <Star className="w-3 h-3 mr-1 fill-current" />
                {project.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
            
            <p className="text-muted-foreground text-sm mb-6 flex-1">
              {project.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
              <span className="text-sm font-medium text-foreground bg-accent px-2 py-1 rounded">
                {project.lang}
              </span>
              <button className="text-sm font-medium text-primary hover:underline">
                Learn Project &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center text-muted-foreground border border-dashed border-border p-12 rounded-xl">
        <p>More projects are being added regularly. Keep checking back!</p>
      </div>
      
      <AdPlaceholder type="banner" className="mt-12" />
    </div>
  );
};
