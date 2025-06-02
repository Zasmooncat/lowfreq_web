import logo from "../imagenes/logos/lowfreq_logo_v.png";
import ImageCarousel from "../components/ImageCarousel";
import { FaInstagram, FaSpotify, FaFacebook, FaSoundcloud } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import artistsInfo from "../utils/artistsInfo";
import events from "../utils/events";
import ContactForm from "../components/ContactForm";


const images = [
    "src/imagenes/carousel/1.jpg",
    "src/imagenes/carousel/2.jpg",
    "src/imagenes/carousel/3.jpg",
    "src/imagenes/carousel/4.jpg",
    "src/imagenes/carousel/5.jpg",
];

const Home = () => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/artist/${id}`);
    };

    return (
        <>
            {/* Sección Home */}
            <section id="home">
                <div className="p-6 ">
                    <ImageCarousel images={images} interval={5000} />
                </div>

                <img src={logo} alt="logo" className="absolute top-30 left-5 w-[300px] z-10 bg-transparent" />

                <div className="flex justify-center gap-6 text-2xl mt-4 mb-20">
                    <a href="https://www.instagram.com/lowfreqmx/" target="_blank" rel="noopener noreferrer">
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
                </div>
            </section>

            {/* Sección Artistas */}
            <section id="artists" className="w-2/3 mx-auto p-4">
                <h2 className="text-3xl font-bold italic uppercase text-center mb-6 mt-6 text-white">Artistas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-20">
                    {artistsInfo.map((artist) => (
                        <div
                            key={artist.id}
                            onClick={() => handleClick(artist.id)}
                            className="cursor-pointer bg-black p-4 rounded-3xl shadow transition"
                        >
                            <img src={artist.image} alt={artist.name} className="w-full h-48 object-cover rounded-full transform transition duration-300 filter saturate-50 hover:saturate-100 hover:scale-105" />
                            <h3 className="text-center text-white uppercase mt-2">{artist.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección Eventos */}
            <section id="events" className="w-11/12 md:w-4/5 mx-auto py-12">
                <h2 className="text-3xl md:text-3xl font-bold italic text-center text-white uppercase mb-8 tracking-wide">
                    Próximos Eventos
                </h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {events.map((evento) => (
                        <div
                            key={evento.id}
                            className="bg-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-xl transition"
                        >
                            <img
                                src={evento.image}
                                alt={evento.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-white">
                                <h3 className="text-xl font-semibold uppercase">{evento.name}</h3>
                                <p className="text-sm mt-1">{evento.date}</p>
                                <p className="text-sm text-gray-400">{evento.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección Contacto */}
            <section id="contact" className="text-center text-white py-12">
                <h2 className="text-3xl font-bold italic uppercase mb-6">Contacto</h2>
                <p>Puedes contactarnos a través de nuestras redes sociales o correo electrónico.</p>
                <div className="text-center mt-8">
                    <ContactForm />
                </div>
            </section>


        </>
    );
};

export default Home;
