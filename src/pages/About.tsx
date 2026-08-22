import { Globe2, BookOpen, Users } from 'lucide-react';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { useSEO } from '../hooks/useSEO';

export const About = () => {
  useSEO({
    title: 'About Us',
    description: 'Learn about EquiLearnCode, founded by Piyush Kumar, providing free programming education for everyone.'
  });

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We are a completely free programming education platform designed to make high-quality coding education accessible to everyone, everywhere.
        </p>
      </div>

      <AdPlaceholder type="banner" className="my-12" />

      <div className="bg-card border border-border rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center shrink-0 border-4 border-background shadow-md">
          <span className="text-3xl font-bold text-primary">PK</span>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-foreground mb-1">Meet the Founder</h2>
          <h3 className="text-lg font-medium text-primary mb-4">Piyush Kumar, Founder & CEO</h3>
          <p className="text-muted-foreground leading-relaxed italic">
            "I started this platform with a simple vision: coding education should be free and accessible to everyone, regardless of their background or financial situation. My goal is to empower students across the globe to learn, code, and build their dream careers without worrying about paywalls."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe that financial constraints should never be a barrier to learning how to code. 
            Our mission is to provide structured, professional-grade programming courses in both English and Hindi, 
            empowering students globally to build their futures in technology.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Global Audience</h3>
              <p className="text-sm text-muted-foreground">Content tailored for international learners with dual language support.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Practical Learning</h3>
              <p className="text-sm text-muted-foreground">Focus on real-world projects and hands-on coding exercises.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">No Barriers</h3>
              <p className="text-sm text-muted-foreground">No accounts required. Start learning immediately without paywalls.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-accent/30 border border-border rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">How we keep it free</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          To maintain the servers and continue producing high-quality content, this platform relies on advertising revenue. 
          We strive to keep advertisements non-intrusive so they do not interfere with your learning experience.
        </p>
      </div>
      
      <AdPlaceholder type="banner" className="mt-16" />
    </div>
  );
};
