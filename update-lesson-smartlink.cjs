const fs = require('fs');
let content = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

const oldButton = `<button 
                  onClick={() => setShowVideoAd(false)}
                  className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition shadow-lg shadow-primary/20"
                >
                  Claim Offer
                </button>`;

const newButton = `<a 
                  href="https://www.effectivecpmnetwork.com/yafmt03w6?key=b93a2e046bc3e4d661aef48a4bdd1b09"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowVideoAd(false)}
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition shadow-lg shadow-primary/20"
                >
                  Visit Sponsor / Claim Offer
                </a>`;

content = content.replace(oldButton, newButton);

fs.writeFileSync('src/pages/Lesson.tsx', content);
