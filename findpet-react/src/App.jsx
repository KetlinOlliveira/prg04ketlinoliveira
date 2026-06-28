import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Palette from "./pages/Palette/Palette";
import Contact from "./pages/Contact/Contact";
import Account from "./pages/Account/Account";

import QuizStart from "./pages/Quiz/QuizStart";
import QuizQuestion from "./pages/Quiz/QuizQuestion";



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

        {/* Página com a identidade visual e palheta de cores */}
        <Route path="/palheta" element={<Palette />} />

        {/* Página de contato */}
        <Route path="/contato" element={<Contact />} />

        {/* Página de conta do usuário */}
        <Route path="/conta" element={<Account />} />

        <Route path="/quiz" element={<QuizStart />} />
        
        <Route path="/quiz/pergunta/:numero" element={<QuizQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;