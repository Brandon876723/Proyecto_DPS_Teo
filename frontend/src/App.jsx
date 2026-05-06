import { BrowserRouter, Routes, Route } from "react-router-dom";
import Libros from "./pages/Libros";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="/libros" element={<Libros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;