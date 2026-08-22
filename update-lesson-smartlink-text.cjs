const fs = require('fs');
let content = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

const oldText = `<h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">EquiLearnCode Premium</h3>
                <p className="text-gray-300 mb-6 text-sm md:text-base">Get 50% off on all Premium Certification Courses today. Elevate your coding journey with 1-on-1 mentorship.</p>`;

const newText = `<h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Sponsored Offer</h3>
                <p className="text-gray-300 mb-6 text-sm md:text-base">Check out our sponsor's exclusive offer. By visiting our sponsors, you help keep our courses free for everyone!</p>`;

content = content.replace(oldText, newText);

fs.writeFileSync('src/pages/Lesson.tsx', content);
