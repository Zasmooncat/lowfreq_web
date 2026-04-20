import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaInstagram } from "react-icons/fa";
import { scroller } from "react-scroll";
import logo from "../imagenes/logos/lowfreqlogoinv.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -80, // Adjust this offset according to your heading height
    });
  };

  const handleNavigation = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      // Direct scroll when already on the home page
      handleScroll(sectionId);
    }
  };

  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;
    if (scrollTarget) {
      // clear the state so it doesn't run again if the location triggers somehow
      window.history.replaceState({}, document.title);
      // Let DOM paint initially then scroll
      requestAnimationFrame(() => {
        handleScroll(scrollTarget);
      });
    }
  }, [location]);

  return (
    <nav className="bg-black/70 backdrop-blur-md text-white shadow-lg fixed w-full z-50">
      <div className="w-full flex justify-between items-center px-6 py-2">
        {/* Logo + Título */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="lowfreqlogo"
            className="w-11 mr-4 cursor-pointer"
            onClick={() => handleNavigation("home")}
          />
        </div>

        {/* Menú hamburguesa */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menú escritorio */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium items-center">
          <li onClick={() => handleNavigation("artists")} className="cursor-pointer uppercase italic hover:text-gray-400">
            Artistas
          </li>
          <li onClick={() => handleNavigation("eventos")} className="cursor-pointer uppercase italic hover:text-gray-400">
            Eventos
          </li>
          <li>
            <a href="https://lowfreqmx.bandcamp.com/" className="uppercase italic hover:text-green-400" target="_blank" rel="noopener noreferrer">
              Música
            </a>
          </li>
          <li onClick={() => handleNavigation("contact")} className="cursor-pointer uppercase italic hover:text-gray-400">
            Contacto
          </li>
          <li>
            <a href="https://www.instagram.com/lowfreqmx/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-pink-500 text-2xl" />
            </a>
          </li>
        </ul>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <ul className="flex flex-col items-center gap-6 md:hidden text-lg font-medium fixed top-16 left-0 w-full py-8 bg-black/90 backdrop-blur-md shadow-lg z-40 uppercase italic">
          <li onClick={() => handleNavigation("artists")} className="cursor-pointer">
            Artistas
          </li>
          <li onClick={() => handleNavigation("eventos")} className="cursor-pointer">
            Eventos
          </li>
          <li>
            <a href="https://lowfreqmx.bandcamp.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
              Música
            </a>
          </li>
          <li onClick={() => handleNavigation("contact")} className="cursor-pointer">
            Contacto
          </li>
          <li>
            <a href="https://www.instagram.com/lowfreqmx/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-pink-500 text-3xl" />
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
