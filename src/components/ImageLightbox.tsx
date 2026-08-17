import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export function ImageLightbox({ isOpen, onClose, imageSrc, imageAlt }: ImageLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset zoom when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setIsZoomed(false), 300);
    }
  }, [isOpen]);

  // Block body scrolling
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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md touch-none" style={{ zIndex: 99999 }}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-4" style={{ zIndex: 100000 }}>
            <button
              onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md"
              title="Vergrößern / Verkleinern (Lupe)"
            >
              {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md"
              title="Schließen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Clickable background to close */}
          <div className="absolute inset-0 z-0 cursor-pointer" onClick={onClose} />

          {/* Image Container */}
          <div 
            ref={containerRef}
            className={`relative z-10 w-full h-full flex items-center justify-center overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <motion.img
              referrerPolicy="no-referrer"
              src={imageSrc}
              alt={imageAlt}
              drag={isZoomed}
              dragConstraints={containerRef}
              dragElastic={0.1}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isZoomed ? 2.5 : 1, 
                opacity: 1 
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-w-full max-h-full object-contain p-4 md:p-12"
              style={{
                cursor: isZoomed ? 'grab' : 'zoom-in',
              }}
              whileDrag={{ cursor: 'grabbing' }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
