import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imagenes/logos/lowfreq_logo_v.png";
import logoLow from "../imagenes/logos/lowfreqlogoinv.png";
import ImageCarousel from "../components/ImageCarousel";
import ContactForm from "../components/ContactForm";
import artistsInfo from "../utils/artistsInfo";
import events from "../utils/events";
import { FaPlay } from 'react-icons/fa';

const images = [
  "src/imagenes/carousel/1.webp",
  "src/imagenes/carousel/2.webp",
  "src/imagenes/carousel/3.webp",
  "src/imagenes/carousel/4.webp",
  "src/imagenes/carousel/5.webp",
  "src/imagenes/carousel/6.webp",
  "src/imagenes/carousel/7.webp",
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (id) => navigate(`/artist/${id}`);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    window.history.pushState({ modal: true }, ""); // Añade una entrada al historial
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
    if (window.history.state?.modal) {
      window.history.back(); // Vuelve una entrada atrás
    }
  };

  useEffect(() => {
    if (!selectedEvent) return;

    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => window.instgrm?.Embeds.process();
      document.body.appendChild(script);
    } else {
      window.instgrm.Embeds.process();
    }
  }, [selectedEvent]);

  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        setSelectedEvent(null);
        setIsModalOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isModalOpen]);

  return (
    <>
      {/* Home */}
      <section id="home" className="relative">
        <div>
          <ImageCarousel images={images} interval={5000} />
        </div>
        <img
          src={logo}
          alt="logo"
          className="absolute mt-5 top-5 w-40 sm:w-40 md:w-[300px] z-10 bg-transparent"
        />
      </section>
      

      {/* Artistas */}
      <section 
      id="artists" 
      className="mx-auto bg-neutral-900/70 rounded-2xl"
      >

        <div className="flex justify-center items-center mt-12">
            
          <h2 className="text-3xl my-4 font-bold italic uppercase text-white">Artistas</h2>
        </div>
        <div className="w-11/12 md:w-10/12 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
            {artistsInfo.map((artist) => (
              <div
                key={artist.id}
                onClick={() => handleClick(artist.id)}
                className="cursor-pointer rounded-full p-4 shadow transition hover:scale-105"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-48 h-48 mx-auto rounded-full object-cover transform transition duration-300 filter saturate-60 hover:saturate-100"
                />
                <h3 className="text-center text-white uppercase mt-4">{artist.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos */}
      <section 
      id="eventos" 
      className="w-11/12 md:w-4/5 mx-auto"
      >
        <h2 className="text-3xl font-bold italic text-center text-white uppercase mb-8 tracking-wide">
          Eventos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => openModal(event)}
              className="bg-black relative overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition"
            >
              <FaPlay className="text-white text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 hover:text-green-500 transition" />
              <img
                src={event.image}
                alt={`Evento ${event.id}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Modal Instagram */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-black p-6 rounded-lg max-w-md w-full relative text-center">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-white text-2xl font-bold"
            >
              &times;
            </button>
            <div className="text-white text-lg font-semibold italic mb-4">INSTAGRAM REELS</div>
            <div
              className="instagram-embed"
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
      )}

      {/* Contacto */}
      <section id="contact" className="rounded-2xl bg-neutral-900/70 text-white p-5 mt-20">
        <div className="flex flex-col items-center justify-center text-center space-y-6 w-full">
          <h2 className="text-3xl font-bold italic uppercase">Contacto</h2>
          <p>Para cualquier duda o contratación, no dudes en escribirnos y te contestaremos lo antes posible.</p>
          <div className="w-full flex justify-center">
            <div className="w-full md:w-2/4">
              <ContactForm />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-20 h-20" src={logoLow} alt="Lowfreq Logo" />
            <p className="mt-2 text-xs">LOWFREQMX®</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
