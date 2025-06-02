import React from "react";
import ArtistCard from "../components/ArtistCard";
import artistsInfo from "../utils/artistsInfo";
import logo from "../imagenes/logos/lowfreqlogoinv.png"; // Importa la imagen del logo
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Artists = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/artist/${id}`);
  };

  return (
    <>
      <img src={logo} alt="logo" className="mx-auto" />

      <section className="w-2/3 mx-auto p-4">

        <h2 className="text-3xl font-bold italic uppercase text-center mb-6 mt-6 text-white">Artistas</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {artistsInfo.map((artist) => (
        <div
          key={artist.id}
          onClick={() => handleClick(artist.id)}
          className="cursor-pointer bg-black p-4 rounded-3xl shadow transition"
        >
          <img src={artist.image} alt={artist.name} className="w-full h-48 object-cover rounded-3xl transform transition duration-300 filter saturate-50 hover:saturate-100 hover:scale-105" />
          <h3 className="text-center text-white uppercase mt-2">{artist.name}</h3>
        </div>
      ))}
    </div>
  </section>
    </>
  );
};
export default Artists;
