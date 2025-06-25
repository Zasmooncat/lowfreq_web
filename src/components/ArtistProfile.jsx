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

 const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  const youtubeVideos = [
    getYoutubeEmbedUrl(artist.video1),
    getYoutubeEmbedUrl(artist.video2),
  ].filter(Boolean); // Elimina valores nulos si no hay videos
console.log("Ruta de imagen:", artist.image);

  return (
   <div
  className="max-w-4xl mx-auto p-4 space-y-10 text-white"
  style={{
    backgroundImage: `url('/assets/imagenes/fondo/test.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
      {/* Encabezado con foto */}
      <div className="text-center p-6 mt-20">


        <img src={artist.image} alt={artist.name}  className="w-64 h-64 object-cover rounded-full mx-auto" />
        <h1 className="text-3xl font-bold mt-4">{artist.name}</h1>
      </div>

      
     {/* Redes sociales */}
<section className="flex justify-center gap-6 text-2xl mt-4">
  {artist.instagramLink && (
    <a href={artist.instagramLink} target="_blank" rel="noopener noreferrer">
      <FaInstagram className="text-gray-500 hover:text-pink-500" />
    </a>
  )}
  {artist.spotyfyLink && (
    <a href={artist.spotyfyLink} target="_blank" rel="noopener noreferrer">
      <FaSpotify className="text-gray-500 hover:text-green-400" />
    </a>
  )}
  {artist.facebookLink && (
    <a href={artist.facebookLink} target="_blank" rel="noopener noreferrer">
      <FaFacebook className="text-gray-500 hover:text-blue-500" />
    </a>
  )}
</section>

      {/* Biografía */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Biografía</h2>
        <p className="text-gray-400">{artist.description}</p>
      </section>

       {/* Botones de descarga */}
      <section className="">
        
        <button className='boton-elegantec mx-auto flex flex-col sm:flex-row gap-4 justify-center'>CONTRATAR</button>
        <a href={artist.downloadLink} download>
          <button className="boton-elegante mx-auto flex flex-col sm:flex-row gap-4 justify-center mt-5">
            PRESSKIT
          </button>
        </a>
        
      </section>
      
     

      {artist.spotifyEmbed && (
  <section>
    
    <div className="flex justify-center">
      <iframe
        src={artist.spotifyEmbed}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="rounded-xl max-w-xl"
        title="Spotify Player"
      ></iframe>
    </div>
  </section>
)}


      {/* Videos de YouTube */}
      {/* Videos de YouTube */}
{youtubeVideos.length > 0 && (
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
)}


     
    </div>
  );
};

export default ArtistProfile;
