import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imagenes/logos/lowfreq_logo_v.png";
import logoLow from "../imagenes/logos/lowfreqlogoinv.png";
import ImageCarousel from "../components/ImageCarousel";
import ContactForm from "../components/ContactForm";
import artistsInfo from "../utils/artistsInfo";
import events from "../utils/events";
import { FaPlay } from 'react-icons/fa';
import EventModal from "../components/EventModal";

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
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

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
          loading="lazy"
        />
      </section>

      {/* Artistas */}
      <section
        id="artists"
        ref={artistsRef}
        className="w-full relative py-20 overflow-hidden"
      >
        {/* Glow abstracto de fondo */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4/5 h-40 bg-zinc-700/20 blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="flex justify-center items-center mb-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold italic uppercase tracking-widest text-white drop-shadow-lg">
            Artistas
          </h2>
        </div>

        <div className="w-11/12 md:max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
            {artistsInfo.map((artist) => (
              <div
                key={artist.id}
                onClick={() => handleClick(artist.id)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 transition-all duration-500 hover:border-neutral-500/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-2"
              >
                <div className="aspect-square w-full overflow-hidden relative">
                  <img
                    loading="lazy"
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Gradiente sutil solo abajo para dar lectura al nombre, sin opacar la foto entera */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide group-hover:text-neutral-300 transition-colors duration-300">
                      {artist.name}
                    </h3>
                    <div className="h-0.5 w-0 bg-white mt-3 transition-all duration-700 ease-out group-hover:w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos */}
      <section
        id="eventos"
        ref={eventsRef}
        className="w-full relative py-20"
      >
        {/* Fondo con fade suave arriba y abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-transparent pointer-events-none -z-10" />
        <div className="flex justify-center items-center mb-16 relative z-10 w-full">
          <h2 className="text-4xl md:text-5xl font-extrabold italic uppercase tracking-widest text-white drop-shadow-lg">
            Eventos
          </h2>
        </div>
        
        <div className="w-11/12 md:max-w-7xl mx-auto relative z-10 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => openModal(event)}
                className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:-translate-y-2 border border-white/5 bg-black"
              >
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                  <img
                    loading="lazy"
                    src={event.image}
                    alt={`Evento ${event.id}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-110"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Glassmorphic Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/30 backdrop-blur-md p-5 rounded-full border border-white/10 group-hover:border-green-500/50 group-hover:bg-black/50 transition-all duration-500 transform scale-90 group-hover:scale-110 ease-out shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      <FaPlay className="text-white/80 text-4xl ml-2 group-hover:text-green-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Instagram */}
      {isModalOpen && selectedEvent && (
        <EventModal selectedEvent={selectedEvent} onClose={closeModal} />
      )}





      {/* Contacto */}
      <section id="contact" className="w-full py-24 relative overflow-hidden">
        {/* Decorative Background for Contact */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-950/80 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[150px] -z-10"></div>

        <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">

          {/* Section title */}
          <h2 className="text-4xl md:text-5xl font-extrabold italic uppercase tracking-widest text-white drop-shadow-lg mb-12 text-center">
            Contacto
          </h2>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* LEFT — Bio */}
            <div className="w-full lg:w-1/2 flex flex-col">

              {/* Header */}
              <div className="mb-8">
                <p className="text-xs tracking-[0.35em] uppercase text-green-500 font-semibold mb-3">Drum &amp; Bass &amp; Jungle — Hecho en México</p>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white">LOWFREQMX</h3>
                <div className="mt-4 h-px w-24 bg-gradient-to-r from-green-500 to-transparent" />
              </div>

              {/* Paragraphs */}
              <div className="space-y-5 text-neutral-300 text-sm md:text-base leading-relaxed">
                <p>
                  Fundado en <span className="text-white font-semibold">2009</span>, LOWFREQMX es uno de los sellos independientes con mayor trayectoria dentro de la cultura Drum &amp; Bass y Jungle en toda América. Con 17 años de actividad ininterrumpida y más de 200 lanzamientos, el sello ha construido un catálogo que reúne a algunos de los artistas y productores más representativos de la escena internacional y nacional.
                </p>
                <p>
                  Desde sus inicios, LOWFREQMX ha mantenido una premisa fundamental: <span className="text-white font-semibold">la música original como eje de identidad</span>. Para el sello, seleccionar música es una parte de la cultura; crearla, desarrollarla y darle una identidad propia es otra dimensión. Bajo esta filosofía, LOWFREQMX entiende el talento como un proceso: no se compra, se construye.
                </p>
                <p>
                  A lo largo de su trayectoria, el sello ha desarrollado una plataforma que va más allá de la edición discográfica. Su actividad integra producción musical, eventos, colaboración artística, desarrollo de talento y cultura Sound System, construyendo un ecosistema alrededor del Drum &amp; Bass y el Jungle desde México hacia el mundo.
                </p>
              </div>

              {/* Digital Ape highlight */}
              <div className="my-8 border border-green-500/25 bg-green-950/20 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-xs tracking-[0.3em] uppercase text-green-500 font-semibold mb-2">Sound System</p>
                <h4 className="text-xl font-black uppercase tracking-wider text-white mb-3">Digital Ape</h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  El primer y mejor Sound System de Drum &amp; Bass y Jungle en México. Con una infraestructura de alta potencia compuesta por <span className="text-white font-semibold">10 scoops</span> y aproximadamente <span className="text-white font-semibold">2.5 toneladas</span> de equipo, DIGITAL APE representa la dimensión física y colectiva de la filosofía LOWFREQMX: el sonido no solamente se escucha; se construye, se experimenta y se vive.
                </p>
              </div>

              <div className="space-y-5 text-neutral-300 text-sm md:text-base leading-relaxed">
                <p>
                  Paralelamente, LOWFREQMX ha desarrollado una agenda de eventos que conecta a México con figuras relevantes de la escena internacional. Sin limitarse al formato tradicional de booking, el sello busca generar <span className="text-white font-semibold">colaboraciones reales</span> entre artistas, productores y proyectos, creando vínculos que trascienden una presentación y contribuyen al desarrollo de la escena local.
                </p>
                <p className="text-neutral-400 italic text-sm">
                  Esta visión define la diferencia entre contratar talento y formar parte de una cultura.
                </p>
              </div>

              {/* Closing manifesto */}
              <div className="mt-10 space-y-1">
                <div className="mb-6 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <p className="text-neutral-400 text-xs uppercase tracking-widest mb-4">Durante 17 años, el principio se ha mantenido intacto</p>
                <p className="text-white text-base font-semibold">En LOWFREQMX no solo se selecciona el sonido.</p>
                <p className="text-green-400 text-lg font-black uppercase tracking-widest">El sonido se crea.</p>
                <p className="text-green-400 text-lg font-black uppercase tracking-widest">El sonido se construye.</p>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <p className="text-green-400 font-semibold justify-center text-center tracking-wide uppercase text-sm mb-6">
                Información y contrataciones
              </p>
              <ContactForm />
              <div className="flex justify-center mt-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <img src={logo} alt="LOWFREQMX Logo" className="w-36 md:w-80 object-contain" loading="lazy" />
              </div>
            </div>

          </div>

          {/* Footer logo */}
          <div className="flex flex-col items-center mt-20 opacity-70 hover:opacity-100 transition-opacity duration-300">
            <img className="w-16 h-16 object-contain" src={logoLow} alt="Lowfreq Logo" loading="lazy" />
            <p className="mt-3 text-xs tracking-[0.2em] font-medium text-neutral-400 uppercase">LOWFREQMX®</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
