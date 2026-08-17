const fs = require('fs');

const file = 'src/components/Hero.tsx';
let code = fs.readFileSync(file, 'utf-8');

// The scroll indicator needs to be clickable and not overlap
// Currently it is:
/*
      {/* Scroll indicator *\/}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </motion.div>
      </motion.div>
*/

code = code.replace(
  '{/* Scroll indicator */}\n      <motion.div \n        initial={{ opacity: 0 }}\n        animate={{ opacity: 1 }}\n        transition={{ delay: 2, duration: 1 }}\n        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"\n      >\n        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">Scroll</span>\n        <motion.div \n          animate={{ y: [0, 8, 0] }} \n          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}\n        >\n          <ChevronDown className="w-4 h-4 text-neutral-500" />\n        </motion.div>\n      </motion.div>',
  `{/* Scroll indicator */}
      <motion.a 
        href="#classes"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium group-hover:text-white transition-colors">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
        </motion.div>
      </motion.a>`
);

// Add pb-32 to the container to prevent overlapping
code = code.replace(
  'className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center"',
  'className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center pb-24 md:pb-0"'
);

fs.writeFileSync(file, code);
console.log('Fixed Hero');
