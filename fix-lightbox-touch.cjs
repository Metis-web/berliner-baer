const fs = require('fs');
const file = 'src/components/ImageLightbox.tsx';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  'className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md"',
  'className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md touch-none"'
);
fs.writeFileSync(file, code);
