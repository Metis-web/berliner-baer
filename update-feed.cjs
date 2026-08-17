const fs = require('fs');

const file = 'src/components/CreatorFeed.tsx';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  '<h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider mb-4">',
  '<h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6">'
);

code = code.replace(
  'Werde Teil unserer Community!',
  'Einblicke in unseren Fahrschul-Alltag'
);

fs.writeFileSync(file, code);
console.log('Fixed CreatorFeed');
