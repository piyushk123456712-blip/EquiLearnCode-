import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, X, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, theme, toggleTheme } = useAppContext();
  const t = translations[language];

  const links = [
    { name: t.home, path: '/' },
    { name: (t as any).compiler || 'Compiler', path: '/compiler' },
    { name: t.courses, path: '/courses' },
    { name: t.roadmaps, path: '/roadmaps' },
    { name: t.projects, path: '/projects' },
    { name: t.about, path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img 
                src="/logo.svg" 
                alt="EquiLearnCode Logo" 
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" 
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold tracking-tight text-foreground text-primary">EquiLearnCode</span>
            </Link>
            <Link to="/settings" className="ml-4 p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors" title="Studio Settings">
              <Settings className="h-5 w-5" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
            >
              {language === 'en' ? 'हिन्दी' : 'English'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium hover:bg-accent rounded-md px-2"
            >
              {language === 'en' ? 'हि' : 'En'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
