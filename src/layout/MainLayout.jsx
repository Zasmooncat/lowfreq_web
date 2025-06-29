import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="relative bg-black min-h-screen text-white overflow-hidden">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
