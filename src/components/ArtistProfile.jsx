import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaInstagram, FaSpotify, FaFacebook, FaYoutube, FaBandcamp } from 'react-icons/fa';
import artistsInfo from '../utils/artistsInfo';
import logo from "../imagenes/logos/lowfreq_logo_v.png";
import logoLow from "../imagenes/logos/lowfreqlogoinv.png";

const ArtistProfile = () => {
  const { id } = useParams();
  const artist = artistsInfo.find((artist) => artist.id === parseInt(id));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) setIsModalOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    window.history.pushState({ modal: true }, '');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    if (window.history.state?.modal) {
      window.history.back();
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  const youtubeVideos = [
    getYoutubeEmbedUrl(artist?.video1),
    getYoutubeEmbedUrl(artist?.video2),
  ].filter(Boolean);

  if (!artist) {
    return <p className="text-center text-white">Artista no encontrado.</p>;
  }

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
      <div className="bg-linear-to-b from-neutral-500/50 to-black mt-20 p-6 rounded-2xl">
        <img src={logo} alt="logo" className="w-60 mx-auto bg-transparent" />
        <div className="text-center rounded-2xl p-6 mt-2">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-64 h-64 object-cover rounded-full mx-auto border-8"
          />
          <h1 className="text-3xl font-bold mt-4">{artist.name}</h1>
          <section className="flex justify-center gap-6 text-2xl mt-4">
            {artist.instagramLink && (
              <a href={artist.instagramLink} target="_blank" rel="noreferrer">
                <FaInstagram className="text-gray-500 hover:text-pink-500" />
              </a>
            )}
            {artist.spotyfyLink && (
              <a href={artist.spotyfyLink} target="_blank" rel="noreferrer">
                <FaSpotify className="text-gray-500 hover:text-green-400" />
              </a>
            )}
            {artist.facebookLink && (
              <a href={artist.facebookLink} target="_blank" rel="noreferrer">
                <FaFacebook className="text-gray-500 hover:text-blue-500" />
              </a>
            )}
            {artist.bandcampLink && (
              <a href={artist.bandcampLink} target="_blank" rel="noreferrer">
                <FaBandcamp className="text-gray-500 hover:text-cyan-400" />
              </a>
            )}
          </section>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2 mt-1">Biografía</h2>
          <p className="text-gray-400">{artist.description}</p>
        </section>
      </div>

      <section>
        <button
          onClick={openModal}
          className="boton-elegantec mx-auto flex flex-col sm:flex-row gap-4 justify-center m-2"
        >
          CONTRATAR
        </button>
        <a href={artist.downloadLink} download target="_blank" rel="noopener noreferrer">
          <button className="boton-elegante mx-auto flex flex-col sm:flex-row gap-4 justify-center m-2">
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

      <div className="flex flex-col items-center">
        <img className="w-20 h-20" src={logoLow} alt="Lowfreq Logo" />
        <p className="mt-2 text-xs">LOWFREQMX®</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
          <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-white text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-white text-xl font-semibold italic mb-4 text-center">
              Contratar a {artist.name}
            </h3>

            {!isSubmitted ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const data = new FormData(form);

                  try {
                    await fetch("https://formsubmit.co/ajax/zasmomoxipol@gmail.com", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                      },
                      body: data,
                    });

                    setIsSubmitted(true);

                    setTimeout(() => {
                      setIsModalOpen(false);
                      setIsSubmitted(false);
                    }, 2000);
                  } catch (error) {
                    console.error("Error enviando el formulario", error);
                  }
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Tu correo"
                  className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Mensaje"
                  rows="4"
                  className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700"
                  required
                ></textarea>

                {/* Campos ocultos */}
                <input type="hidden" name="_subject" value={`Nueva solicitud para ${artist.name}`} />
                <input type="hidden" name="_captcha" value="false" />

                <button
                  type="submit"
                  className="bg-neutral-500 hover:bg-neutral-600 text-white px-6 py-2 rounded-md w-full"
                >
                  Enviar solicitud
                </button>
              </form>
            ) : (
              <p className="text-green-400 text-center text-lg font-bold">
                ✅ ¡Mensaje enviado!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;
