import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaInstagram } from "react-icons/fa";
import logo from "../imagenes/logos/lowfreqlogoinv.png";
import { scrollToSection } from "../utils/scrollToSection";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      // Si ya estás en la home, scroll directo
      setTimeout(() => scrollToSection(sectionId), 100); // Espera breve por si aún no se ha montado
    }
  };

  // Este efecto se activa cuando vienes de otra ruta con intención de hacer scroll
  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;
    if (scrollTarget) {
      setTimeout(() => {
        scrollToSection(scrollTarget);
      }, 300); // Da tiempo a cargar el DOM
    }
  }, [location]);

  return (
    <nav className="bg-black/70 backdrop-blur-md text-white shadow-lg fixed w-full z-50">
      <div className="w-full flex justify-between items-center px-6 py-2">
        {/* Logo + Título */}
        <div className="flex items-center">
          <img src={logo} alt="lowfreqlogo" className="w-11 mr-4 cursor-pointer" onClick={() => handleNavigation("home")} />
          
        </div>

        {/* Menú hamburguesa */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menú escritorio */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          <li onClick={() => handleNavigation("artists")} className="cursor-pointer uppercase italic hover:text-gray-400">Artistas</li>
          <li onClick={() => handleNavigation("eventos")} className="cursor-pointer uppercase italic hover:text-gray-400">Eventos</li>
          <li>
            <a href="https://www.beatport.com/es/label/lowfreqmx/28822" className="uppercase italic hover:text-gray-400" target="_blank" rel="noopener noreferrer">
              Música
            </a>
          </li>
          <li onClick={() => handleNavigation("contact")} className="cursor-pointer uppercase italic hover:text-gray-400">Contacto</li>
          <li>
            <a href="https://www.instagram.com/lowfreqmx/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-pink-500" />
            </a>
          </li>
        </ul>
      </div>
      

      {/* Menú móvil */}
      {isOpen && (
        <ul className="flex flex-col items-center gap-6 md:hidden text-lg font-medium fixed top-16 left-0 w-full py-8 bg-black/50 backdrop-blur-md shadow-lg z-40 uppercase italic">
          <li onClick={() => handleNavigation("artists")}>Artistas</li>
          <li onClick={() => handleNavigation("eventos")}>Eventos</li>
          <li>
            <a href="https://www.beatport.com/es/label/lowfreqmx/28822">Música</a>
          </li>
          <li onClick={() => handleNavigation("contact")}>Contacto</li>
          <li>
            <li>
            <a href="https://www.instagram.com/lowfreqmx/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-pink-500" />
            </a>
          </li>
          </li>
        </ul>
        
      )}
      
    </nav>
  );
};

export default Navbar;
