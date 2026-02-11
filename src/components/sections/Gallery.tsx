import React, { useState, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const placeholderImages = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `Imagem ${i + 1}`,
  description: 'Foto de treino, evento ou seletiva',
  height: [280, 350, 300, 320, 380, 290, 340, 310, 360][i],
}));

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const titleAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation();

  const openLightbox = (id: number) => {
    setSelectedImage(id);
  };

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = placeholderImages.findIndex(img => img.id === selectedImage);
    if (direction === 'prev') {
      const newIndex = currentIndex <= 0 ? placeholderImages.length - 1 : currentIndex - 1;
      setSelectedImage(placeholderImages[newIndex].id);
    } else {
      const newIndex = currentIndex >= placeholderImages.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(placeholderImages[newIndex].id);
    }
  }, [selectedImage]);

  // ESC to close, arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage, closeLightbox, navigateImage]);

  return (
    <>
      <section id="galeria" className="py-16 md:py-24 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div ref={titleAnim.ref}>
              <h2
                className={`text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-primary transition-all duration-700 ${
                  titleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Galeria
              </h2>
              <p
                className={`text-center text-gray-400 mb-12 text-lg transition-all duration-700 delay-200 ${
                  titleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Momentos dos nossos treinos e eventos
              </p>
            </div>

            {/* Masonry Grid */}
            <div ref={gridAnim.ref} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {placeholderImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`break-inside-avoid cursor-pointer group transition-all duration-500 ${
                    gridAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  onClick={() => openLightbox(image.id)}
                >
                  <div
                    className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]"
                    style={{ height: image.height }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary-start to-secondary-end flex items-center justify-center">
                      <div className="text-center text-white p-8 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                        <p className="text-sm">{image.description}</p>
                      </div>
                    </div>
                    {/* Hover overlay with title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-white font-semibold">{image.title}</p>
                        <p className="text-white/70 text-sm">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-up"
          style={{ animationDuration: '0.2s' }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Fechar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            aria-label="Anterior"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Navigation - Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            aria-label="Próximo"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {selectedImage} / {placeholderImages.length}
          </div>

          {/* Main content */}
          <div
            className="max-w-4xl w-full aspect-video bg-gradient-to-br from-primary-start to-secondary-end flex items-center justify-center rounded-xl shadow-2xl animate-scale-in"
            style={{ animationDuration: '0.3s' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center text-white p-8">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <p className="text-lg">{placeholderImages[selectedImage - 1]?.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
