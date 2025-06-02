import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaInstagram, FaSpotify, FaFacebook, FaSoundcloud } from 'react-icons/fa';
import artistsInfo from '../utils/artistsInfo';

const ArtistProfile = () => {
    useEffect(() => {
    window.scrollTo(0, 0); // Scroll a la parte superior
  }, []);

  const { id } = useParams();
  const artist = artistsInfo.find((artist) => artist.id === parseInt(id));

  if (!artist) {
    return <p className="text-center text-white">Artista no encontrado.</p>;
  }

  const shows = [
    { date: '2025-06-15', venue: 'Teatro Real, Madrid', ticketLink: 'https://example.com/tickets1' },
    { date: '2025-07-01', venue: 'Lollapalooza, Buenos Aires', ticketLink: 'https://example.com/tickets2' },
  ];

  const youtubeVideos = [
    'https://www.youtube.com/embed/VIDEO_ID1',
    'https://www.youtube.com/embed/VIDEO_ID2',
  ];
console.log("Ruta de imagen:", artist.image);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-10 text-white">
      {/* Encabezado con foto */}
      <div className="text-center p-6 mt-20">


        <img src={artist.image} alt={artist.name}  className="w-64 h-64 object-cover rounded-full mx-auto" />
        <h1 className="text-3xl font-bold mt-4">{artist.name}</h1>
      </div>

      {/* Redes sociales */}
      <section className="flex justify-center gap-6 text-2xl mt-4">
        <a href="https://instagram.com/tuusuario" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-gray-500 hover:text-pink-500" />
        </a>
        <a href="https://spotify.com/tuusuario" target="_blank" rel="noopener noreferrer">
          <FaSpotify className="text-gray-500 hover:text-green-400" />
        </a>
        <a href="https://facebook.com/tuusuario" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-gray-500 hover:text-blue-500" />
        </a>
        <a href="https://soundcloud.com/tuusuario" target="_blank" rel="noopener noreferrer">
          <FaSoundcloud className="text-gray-500 hover:text-orange-400" />
        </a>
      </section>

      {/* Biografía */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Biografía</h2>
        <p className="text-gray-400">{artist.description}</p>
      </section>

      {/* Próximas actuaciones */}
      <section>
        <h1 className='text-black mx-auto'>PRÓXIMAS FECHAS</h1>
        <h2 className="text-xl font-semibold mb-4">Próximas actuaciones</h2>
        <ul className="space-y-4">
          {shows.map((show, index) => (
            <li key={index} className="bg-gray-700 p-4  flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{show.date}</p>
                <p className="text-gray-400">{show.venue}</p>
              </div>
              <a href={show.ticketLink} target="_blank" rel="noopener noreferrer">
                <button className="mt-2 sm:mt-0 bg-gray-500 hover:bg-black transition px-4 py-2 rounded-lg text-white">
                  Tickets
                </button>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Videos de YouTube */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {youtubeVideos.map((url, index) => (
            <iframe
              key={index}
              width="100%"
              height="200"
              src={url}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      </section>

      {/* Botones de descarga */}
      <section className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={artist.downloadLink} download>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white">
            Descargar Presskit
          </button>
        </a>
        <a href="/ruta-rider.pdf" download>
          <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-white">
            Descargar Rider
          </button>
        </a>
      </section>
    </div>
  );
};

export default ArtistProfile;
