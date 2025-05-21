import { Link } from "react-router-dom";
import logo from "../imagenes/lowfreqlogoinv.png";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-0 py-4 shadow-lg">
      <div className="w-full flex justify-between items-center px-6">
        {/* Logo + Título a la izquierda */}
        <div className="flex items-center">
          <img src={logo} alt="lowfreqlogo" className="w-11 mr-4" />
          <Link to="/" className="text-2xl font-bold italic">LOWFREQ</Link>
        </div>

        {/* Menú a la derecha */}
        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <Link to="/artists" className="hover:text-gray-400 transition">Artists</Link>
          </li>
          <li>
            <Link to="/eventos" className="hover:text-gray-400 transition">Events</Link>
          </li>
          <li>
            <Link to="/music" className="hover:text-gray-400 transition">Music</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400 transition">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
