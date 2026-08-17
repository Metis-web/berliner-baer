const fs = require('fs');
const file = 'src/components/ImageLightbox.tsx';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  'className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md touch-none"',
  'className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md touch-none" style={{ zIndex: 99999 }}'
);
code = code.replace(
  'className="absolute top-4 right-4 md:top-6 md:right-6 z-[100000] flex items-center gap-4"',
  'className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-4" style={{ zIndex: 100000 }}'
);

fs.writeFileSync(file, code);
console.log('Fixed z-index');
