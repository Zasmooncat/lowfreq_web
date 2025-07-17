import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      
      {/* Video de fondo */}
      <img
        loading="lazy"
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
        src="/assets/imagenes/fondo/FondoTexturaLFQ.png"
        
      />

    

      {/* Contenido principal */}
      <Navbar />
      <main className="pt-4 relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
