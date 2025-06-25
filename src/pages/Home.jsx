import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imagenes/logos/lowfreq_logo_v.png";
import ImageCarousel from "../components/ImageCarousel";
import ContactForm from "../components/ContactForm";
import artistsInfo from "../utils/artistsInfo";
import events from "../utils/events";
import logoLow from "../../src/imagenes/logos/lowfreqlogoblack.png";

const images = [
  "src/imagenes/carousel/1.jpg",
  "src/imagenes/carousel/2.jpg",
  "src/imagenes/carousel/3.jpg",
  "src/imagenes/carousel/4.jpg",
  "src/imagenes/carousel/5.jpg",
  "src/imagenes/carousel/6.jpg",
  "src/imagenes/carousel/7.jpg",
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (id) => {
    navigate(`/artist/${id}`);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  // Carga el script de Instagram al abrir un reel
  useEffect(() => {
    if (!selectedEvent) return;

    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.instgrm) window.instgrm.Embeds.process();
      };
      document.body.appendChild(script);
    } else {
      window.instgrm.Embeds.process();
    }
  }, [selectedEvent]);

  return (
    <>
      {/* Sección Home */}
      <section id="home" className="relative">
        <div className="p-6">
          <ImageCarousel images={images} interval={5000} />
        </div>
        <img
          src={logo}
          alt="logo"
          className="absolute top-10 left-5 w-40 sm:w-40 md:w-[300px] z-10 bg-transparent"
        />
      </section>

      {/* Sección Artistas */}
      <section id="artists" className="w-5/6 mx-auto">
        <div className="w-full flex justify-center items-center mt-12">
          <h2 className="text-3xl font-bold italic uppercase text-center my-3 text-white">Artistas</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 mb-20">
          {artistsInfo.map((artist) => (
            <div
              key={artist.id}
              onClick={() => handleClick(artist.id)}
              className="cursor-pointer bg-black p-7 shadow transition hover:scale-105"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-48 h-48 mx-auto object-cover transform transition duration-300 filter saturate-50 hover:saturate-100"
              />
              <h3 className="text-center text-white uppercase mt-4">{artist.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Eventos */}
      <section id="eventos" className="w-11/12 md:w-4/5 mx-auto py-12">
        <h2 className="text-3xl font-bold italic text-center text-white uppercase mb-8 tracking-wide">
          Eventos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => openModal(event)}
              className="bg-black overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition"
            >
              <img
                src={event.image}
                alt={`Evento ${event.id}`}
                className="w-full h-64 object-cover"
              />
              
            </div>
          ))}
        </div>
      </section>

      {/* Modal con Instagram Reel */}
      {isModalOpen && selectedEvent && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md px-4">
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


      {/* Sección Contacto */}
      <section id="contact" className="text-center text-white py-12">
        <h2 className="text-3xl font-bold italic uppercase mb-6">Contacto</h2>
        <div className="flex mt-8 justify-center">
            <img src={logoLow} alt="" />
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default Home;
