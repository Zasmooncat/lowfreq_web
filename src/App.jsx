import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";

import ArtistProfile from "./components/ArtistProfile";
import './styles/global.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

