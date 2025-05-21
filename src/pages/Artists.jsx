import React from "react";
import ArtistCard from "../components/ArtistCard";
import artistsInfo from "../utils/artistsInfo";
import logo from "../imagenes/lowfreqlogoinv.png"; // Importa la imagen del logo

const Artists = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
       <img src={logo} alt="logo" className="mx-auto" />
      <h1 className="text-6xl">ARTISTS ROOSTER</h1>
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {artistsInfo.map((artist) => (
        <ArtistCard
          key={artist.id}
          image={artist.image}
          name={artist.name}
          description={artist.description}
          downloadLink={artist.downloadLink}
        />
      ))}
    </div>
    </div>
  );
};

export default Artists;
