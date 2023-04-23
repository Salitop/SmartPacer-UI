import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Base from "./pages/Base";
import HomeAluno from "./pages/HomeAluno";
import HomeProfessor from "./pages/HomeProfessor";
import Login from "./pages/Login";
import ViewPacer from "./pages/ViewPacer";
import CadastrarPacer from "./pages/CadastrarPacer"
import viewAlunos from "./pages/ViewAlunos"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Base />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home-aluno" element={<HomeAluno />} />
          <Route exact path="/home-prof" element={<HomeProfessor />} />
          <Route exact path="/viewPacer" element={<ViewPacer />} />
          <Route exact path="/cadastrarPacer" element={<CadastrarPacer/>}/>
          <Route exact path="/viewAlunos" element={<viewAlunos/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;