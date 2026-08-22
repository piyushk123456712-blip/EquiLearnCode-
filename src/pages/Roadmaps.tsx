import { Map, ArrowDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';
import { roadmaps } from '../data/courses';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { useSEO } from '../hooks/useSEO';

export const Roadmaps = () => {
  const { language } = useAppContext();
  const t = translations[language];

  useSEO({
    title: t.roadmaps,
    description: 'Step-by-step learning paths to guide you from beginner to professional developer.'
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">{t.roadmaps}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Step-by-step learning paths to guide you from beginner to professional developer.
        </p>
      </div>

      <AdPlaceholder type="banner" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        {roadmaps.map(roadmap => (
          <div key={roadmap.id} className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <Map className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{roadmap.title}</h2>
            </div>

            <div className="space-y-4">
              {roadmap.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 text-sm font-bold text-muted-foreground z-10 border-4 border-card">
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-accent/50 p-4 rounded-lg font-medium text-foreground">
                      {step}
                    </div>
                  </div>
                  {idx < roadmap.steps.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 -ml-[1px] bg-border h-full -z-0 flex justify-center items-center">
                      <ArrowDown className="w-3 h-3 text-muted-foreground mt-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <AdPlaceholder type="banner" className="mt-16" />
    </div>
  );
};
