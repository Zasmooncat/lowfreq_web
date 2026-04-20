import React, { useEffect } from 'react';

const EventModal = ({ selectedEvent, onClose }) => {
  // Handle keyboard interaction (Escape key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle instagram embed script logic
  useEffect(() => {
    let scriptEl = null;

    if (!window.instgrm) {
      scriptEl = document.createElement("script");
      scriptEl.src = "https://www.instagram.com/embed.js";
      scriptEl.async = true;
      scriptEl.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(scriptEl);
    } else {
      window.instgrm.Embeds.process();
    }

    return () => {
      // Optional: Since Instagram embed mutates the DOM, it's safer to not forcefully remove the
      // script to avoid errors on other pages, but we could cancel operations if needed.
    };
  }, [selectedEvent]);

  if (!selectedEvent) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-black p-6 rounded-lg max-w-md w-full relative text-center shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-2xl font-bold z-10 transition hover:text-red-500"
        >
          &times;
        </button>
        <div className="text-white text-lg font-semibold italic mb-4">INSTAGRAM REELS</div>
        <div
          className="instagram-embed min-h-[400px] flex items-center justify-center"
          dangerouslySetInnerHTML={{
            __html: `
              <blockquote 
                class="instagram-media" 
                data-instgrm-permalink="${selectedEvent.igLink}" 
                data-instgrm-version="14" 
                style="background:#fff; border:0; margin: 0 auto; max-width:540px; width:100%;">
              </blockquote>
            `,
          }}
        />
      </div>
    </div>
  );
};

export default EventModal;
