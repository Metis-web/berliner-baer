const fs = require('fs');

const file = 'src/components/Fleet.tsx';
let code = fs.readFileSync(file, 'utf-8');

// Add import
if (!code.includes('ImageLightbox')) {
  code = code.replace(
    "import { Section } from './ui/Section';",
    "import { Section } from './ui/Section';\nimport { ImageLightbox } from './ImageLightbox';"
  );
}

// Add state
if (!code.includes('lightboxOpen')) {
  code = code.replace(
    "const [loading, setLoading] = useState(true);",
    "const [loading, setLoading] = useState(true);\n  const [lightboxOpen, setLightboxOpen] = useState(false);\n  const [lightboxData, setLightboxData] = useState({ src: '', alt: '' });\n\n  const openLightbox = (src: string, alt: string) => {\n    setLightboxData({ src, alt });\n    setLightboxOpen(true);\n  };"
  );
}

// Add click handler to image container and cursor styles
code = code.replace(
  '<div className="aspect-[4/3] overflow-hidden relative z-10">',
  '<div className="aspect-[4/3] overflow-hidden relative z-10 cursor-zoom-in" onClick={() => openLightbox(car.img, car.name)}>'
);

// Add Lightbox component at the end before </Section>
code = code.replace(
  '    </Section>',
  '      <ImageLightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} imageSrc={lightboxData.src} imageAlt={lightboxData.alt} />\n    </Section>'
);

fs.writeFileSync(file, code);
console.log('Fixed Fleet');
