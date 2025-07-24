import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imagenes/logos/lowfreq_logo_v.png";
import logoLow from "../imagenes/logos/lowfreqlogoinv.png";
import ImageCarousel from "../components/ImageCarousel";
import ContactForm from "../components/ContactForm";
import artistsInfo from "../utils/artistsInfo";
import events from "../utils/events";
import { FaPlay } from 'react-icons/fa';

const images = [
  "/assets/imagenes/carousel/1.webp",
  "/assets/imagenes/carousel/2.webp",
  "/assets/imagenes/carousel/3.webp",
  "/assets/imagenes/carousel/4.webp",
  "/assets/imagenes/carousel/5.webp",
  "/assets/imagenes/carousel/6.webp",
  "/assets/imagenes/carousel/7.webp",
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const artistsRef = useRef(null);
  const eventsRef = useRef(null);

  const handleClick = (id) => navigate(`/artist/${id}`);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    window.history.pushState({ modal: true }, "");
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
    if (window.history.state?.modal) {
      window.history.back();
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
        <div className="shadow-[0_0_120px_rgba(0,0,0,1)] bg-black/70">
          <ImageCarousel   images={images} interval={5000} />
        </div>
        <img
          src={logo}
          alt="logo"
          className="absolute  mt-5 top-5 w-40 sm:w-40 md:w-[300px] z-10 bg-transparent"
        />
      </section>

      {/* Artistas */}
      <section
        id="artists"
        ref={artistsRef}
        className="mx-auto  rounded-2xl"
      >
        <div className="flex justify-center items-center mt-12">
          <h2 className="text-3xl my-4 font-bold italic uppercase text-white">Artistas</h2>
        </div>
        <div className="w-11/12 md:w-10/13 mx-auto">
          <div className="bg-linear-to-b from-neutral-900/50 to-neutral-900 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-20 p-8">
            {artistsInfo.map((artist) => (
              <div
                key={artist.id}
                onClick={() => handleClick(artist.id)}
                className="cursor-pointer rounded-full p-4 shadow transition "
              >
                <img
                  loading="lazy"
                  src={artist.image}
                  alt={artist.name}
                  className="w-48 h-48 mx-auto rounded-full object-cover transform transition duration-300 filter saturate-60 hover:saturate-100 hover:scale-105 
            hover:drop-shadow-[0_0_20px_rgba(200,200,250,0.2)]"
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
        ref={eventsRef}
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
                loading="lazy"
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
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
    onClick={(e) => {
      // Solo cerrar si se hace clic directamente en el fondo, no dentro del modal
      if (e.target.id === "modal-backdrop") {
        setIsModalOpen(false);
        setSelectedEvent(null);
      }
    }}
    id="modal-backdrop"
  >
    <div
      className="bg-black p-6 rounded-lg max-w-md w-full relative text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        className="absolute top-2 right-4 text-white text-2xl font-bold z-10"
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
      <section id="contact" className="rounded-2xl text-white p-5 mt-20">
        <div className="flex flex-col items-center justify-center text-center space-y-6 w-full">
          <h2 className="text-3xl font-bold italic uppercase">Contacto</h2>
          <div className="w-full md:w-2/4">

          <p className="text-start"><strong>LOWFREQMX</strong>, Sello discográfico y plataforma multicultural que promueve la cultura del Drum and Bass y del Jungle en México. Soportado por los DJs más grandes de su género a nivel mundial, es un impulsor para talentos emergentes que necesitan un espacio en la escena local.</p>
            <p className="text-start"> Para cualquier duda o contratación, ponte en contacto con nosotros rellenando este formulario y te contestaremos lo antes posible.</p>
          </div>
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
