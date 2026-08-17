const fs = require('fs');
const file = 'src/components/Team.tsx';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  'className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"',
  'className="w-full h-full object-cover object-[70%_20%] scale-[1.15] grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-[1.25] transition-all duration-700"'
);
fs.writeFileSync(file, code);
console.log('Fixed Team images');
