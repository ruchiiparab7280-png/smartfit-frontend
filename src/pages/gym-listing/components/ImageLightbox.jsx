import React, { useEffect, useCallback } from "react";
import Icon from "../../../components/AppIcon";

const ImageLightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-colors"
      >
        <Icon name="X" size={24} className="text-white" />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <span className="text-white text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-colors"
        >
          <Icon name="ChevronLeft" size={28} className="text-white" />
        </button>
      )}

      {/* Image */}
      <div
        className="flex items-center justify-center w-full h-full p-16"
        onClick={onClose}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-colors"
        >
          <Icon name="ChevronRight" size={28} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default ImageLightbox;
