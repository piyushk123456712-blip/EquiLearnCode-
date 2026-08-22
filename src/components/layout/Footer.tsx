import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const Footer = () => {
  const { language } = useAppContext();
  const t = translations[language];

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold tracking-tight text-foreground text-primary">EquiLearnCode</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Learn. Code. Build. Free programming education platform designed for a global audience.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/courses" className="hover:text-foreground transition-colors">{t.courses}</Link></li>
              <li><Link to="/roadmaps" className="hover:text-foreground transition-colors">{t.roadmaps}</Link></li>
              <li><Link to="/projects" className="hover:text-foreground transition-colors">{t.projects}</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">{t.about}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">{t.contact}</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">{t.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">{t.terms}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
