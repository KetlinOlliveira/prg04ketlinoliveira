import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Palette from "./pages/Palette/Palette";
import Contact from "./pages/Contact/Contact";

/*
  App é o componente principal da aplicação.

  Aqui ficam as rotas do projeto usando React Router DOM.
  Cada rota aponta para uma página diferente, substituindo a navegação
  antiga feita com vários arquivos HTML separados.
*/
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial do sistema */}
        <Route path="/" element={<Home />} />

        {/* Tela de login fictício */}
        <Route path="/login" element={<Login />} />

        {/* Painel administrativo de usuários */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Página com a identidade visual e palheta de cores */}
        <Route path="/palheta" element={<Palette />} />

        {/* Página de contato */}
        <Route path="/contato" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
