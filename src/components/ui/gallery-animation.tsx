import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableGalleryProps {
  images: { url: string; label: string }[];
  className?: string;
}

const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({ images, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) return 1;
    return hoveredIndex === index ? 2.8 : 0.4;
  };

  return (
    <div className={className}>
      {/* Horizontal expandable strip */}
      <div className="flex gap-2 h-full w-full">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden"
            style={{ flex: 1, borderRadius: 0 }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openImage(index)}
          >
            <img
              src={image.url}
              alt={image.label}
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* Dark overlay — lifted on hover */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(8,8,8,0.55)' }}
              animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
              transition={{ duration: 0.35 }}
            />

            {/* Gold accent line bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold origin-left"
              animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Label — only on hovered */}
            <motion.div
              className="absolute bottom-4 left-4 right-4"
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
                y: hoveredIndex === index ? 0 : 8,
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-display text-lg text-cream">{image.label}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(8,8,8,0.97)' }}
            onClick={closeImage}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 z-10 text-cream/50 hover:text-gold transition-colors"
              onClick={closeImage}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                className="absolute left-6 z-10 w-12 h-12 border border-gold/30 text-gold/70 hover:border-gold hover:text-gold transition-all flex items-center justify-center"
                onClick={goToPrev}
              >
                ←
              </button>
            )}

            {/* Image */}
            <motion.div
              className="relative max-w-5xl max-h-[88vh] w-full px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].label}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Label */}
              <div className="mt-4 text-center">
                <p className="font-display text-xl text-cream">{images[selectedIndex].label}</p>
                <div className="w-12 h-px bg-gold mx-auto mt-2" />
              </div>
            </motion.div>

            {/* Next */}
            {images.length > 1 && (
              <button
                className="absolute right-6 z-10 w-12 h-12 border border-gold/30 text-gold/70 hover:border-gold hover:text-gold transition-all flex items-center justify-center"
                onClick={goToNext}
              >
                →
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <span className="font-display text-2xl text-gold">{String(selectedIndex + 1).padStart(2, '0')}</span>
              <span className="text-cream/30 text-sm">/ {String(images.length).padStart(2, '0')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ExpandableGallery };
