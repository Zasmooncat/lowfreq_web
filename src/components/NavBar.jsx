import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../imagenes/logos/lowfreqlogoinv.png";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-black text-white shadow-lg fixed w-full z-50">
      <div className="w-full flex justify-between items-center px-6 py-4">
        {/* Logo + Título */}
        <div className="flex items-center">
          <img src={logo} alt="lowfreqlogo" className="w-11 mr-4" />
          <Link
            to="/"
            smooth={true}
            duration={500}
            className="text-2xl font-bold italic cursor-pointer"
            onClick={closeMenu}
          >
            LOWFREQ
          </Link>
        </div>

        {/* Icono menú hamburguesa solo en móviles */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menú en escritorio */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          <li>
            <ScrollLink
              to="artists"
              smooth={true}
              duration={500}
              className="uppercase italic hover:text-gray-400 transition cursor-pointer"
            >
              Artists
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="eventos"
              smooth={true}
              duration={500}
              className="uppercase italic hover:text-gray-400 transition cursor-pointer"
            >
              Events
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="music"
              smooth={true}
              duration={500}
              className="uppercase italic hover:text-gray-400 transition cursor-pointer"
            >
              Music
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="uppercase italic hover:text-gray-400 transition cursor-pointer"
            >
              Contact
            </ScrollLink>
          </li>
        </ul>
      </div>

      {/* Menú desplegable móvil */}
      {isOpen && (
        <ul className="flex flex-col items-center gap-6 md:hidden text-lg font-medium
                       fixed top-16 left-0 w-full py-8 
                       bg-black/50 backdrop-blur-md shadow-lg z-40">
          <li>
            <ScrollLink
              to="artists"
              smooth={true}
              duration={500}
              className="uppercase italic hover:text-gray-300 transition cursor-pointer"
              onClick={closeMenu}
            >
              Artists
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="eventos"
              smooth={true}
              duration={500}
              className="uppercase italic hover:text-gray-300 transition cursor-pointer"
              onClick={closeMenu}
            >
              Events
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="music"
              smooth={true}
              duration={500}
              className="uppercase italic hover:text-gray-300 transition cursor-pointer"
              onClick={closeMenu}
            >
              Music
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="uppercase italic hover:text-gray-300 transition cursor-pointer"
              onClick={closeMenu}
            >
              Contact
            </ScrollLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
