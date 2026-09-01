const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

const target = `          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">{t.contact}</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">{t.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">{t.terms}</Link></li>
            </ul>
          </div>`;

const replacement = `          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">{t.contact}</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">{t.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">{t.terms}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contact.teenovawear@zohomail.in" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Email Us
                </a>
              </li>
              <li>
                <a href="https://whatsapp.com/channel/0029Va4m0xFJ93wel8quoZ2A" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                  WhatsApp Channel
                </a>
              </li>
            </ul>
          </div>`;

code = code.replace(target, replacement);
// We might need to change grid-cols-4 to grid-cols-5 or similar.
code = code.replace('grid-cols-1 md:grid-cols-4', 'grid-cols-1 md:grid-cols-5');
fs.writeFileSync('src/components/layout/Footer.tsx', code);
