import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeAluno from "./pages/HomeAluno";
import HomeProfessor from "./pages/HomeProfessor";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route defaultView path="/login" element={<Login />} />
          <Route exact path="/home-aluno" element={<HomeAluno />} />
          <Route exact path="/home-prof" element={<HomeProfessor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
