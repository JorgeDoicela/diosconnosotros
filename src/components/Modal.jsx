import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Modal = ({ isOpen, onClose, mediaItem, onNext, onPrev }) => {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!mediaItem) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50">
            <X size={32} />
          </button>

          {/* Prev Button */}
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-2 md:left-8 text-white/70 hover:text-white p-2 z-50 transition-transform active:scale-95">
            <ChevronLeft size={48} />
          </button>

          {/* Next Button */}
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-2 md:right-8 text-white/70 hover:text-white p-2 z-50 transition-transform active:scale-95">
            <ChevronRight size={48} />
          </button>

          {/* Content */}
          <motion.div
            key={mediaItem.id} // Re-render when item changes for animation
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[85vh] aspect-auto flex items-center justify-center"
          >
            {mediaItem.type === 'video' ? (
              mediaItem.videoUrl?.includes('youtube') || mediaItem.videoUrl?.includes('vimeo') ? (
                <iframe src={mediaItem.videoUrl} className="w-full aspect-video rounded-lg" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              ) : (
                <video src={mediaItem.videoUrl} poster={mediaItem.thumbnail} className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" controls autoPlay playsInline></video>
              )
            ) : (
              <img src={mediaItem.url} alt="Full view" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;