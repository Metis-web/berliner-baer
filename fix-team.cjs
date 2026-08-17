const fs = require('fs');

const file = 'src/components/Team.tsx';
let code = fs.readFileSync(file, 'utf-8');

// Add import
if (!code.includes('ImageLightbox')) {
  code = code.replace(
    "import { ChevronLeft, ChevronRight } from 'lucide-react';",
    "import { ChevronLeft, ChevronRight } from 'lucide-react';\nimport { ImageLightbox } from './ImageLightbox';"
  );
}

// Add state
if (!code.includes('lightboxOpen')) {
  code = code.replace(
    "const scrollRef = useRef<HTMLDivElement>(null);",
    "const scrollRef = useRef<HTMLDivElement>(null);\n  const [lightboxOpen, setLightboxOpen] = useState(false);\n  const [lightboxData, setLightboxData] = useState({ src: '', alt: '' });\n\n  const openLightbox = (src: string, alt: string) => {\n    setLightboxData({ src, alt });\n    setLightboxOpen(true);\n  };"
  );
}

// Add click handler to image container and cursor
code = code.replace(
  '<div className="aspect-[4/5] overflow-hidden relative">',
  '<div className="aspect-[4/5] overflow-hidden relative cursor-zoom-in" onClick={() => openLightbox(member.img, member.name)}>'
);

// Add Lightbox component at the end before </Section>
code = code.replace(
  '    </Section>',
  '      <ImageLightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} imageSrc={lightboxData.src} imageAlt={lightboxData.alt} />\n    </Section>'
);

fs.writeFileSync(file, code);
console.log('Fixed Team');
