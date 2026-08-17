const fs = require('fs');
const file = 'src/components/ImageLightbox.tsx';
let code = fs.readFileSync(file, 'utf-8');

if (!code.includes('document.body.style.overflow')) {
  code = code.replace(
    '// Handle escape key',
    `// Block body scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key`
  );
  fs.writeFileSync(file, code);
  console.log('Fixed body scroll');
}
