import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Eventos from "./pages/Eventos";
import Musica from "./pages/Musica";
import Contact from "./pages/Contact";
import ArtistProfile from "./components/ArtistProfile";
import './styles/global.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="artists" element={<Artists />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="music" element={<Musica />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

