import logo from "../imagenes/lowfreqlogo.jpeg"
import ImageCarousel from "../components/ImageCarousel";

const images = [
    "src/imagenes/carousel/1.jpg",
    "src/imagenes/carousel/2.jpg",
    "src/imagenes/carousel/3.jpg",
    "src/imagenes/carousel/4.jpg",
    "src/imagenes/carousel/5.jpg",

];


const Home = () => {
    return (
        <section>



            <div className="p-6">
                <ImageCarousel images={images} interval={5000} />
                {/* Puedes agregar más contenido de bienvenida aquí */}
            </div>

            <img src={logo} alt="logo" className="mx-auto" />


        </section>
    );
};

export default Home;
