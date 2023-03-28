import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Base from "./pages/Base";
import HomeAluno from "./pages/HomeAluno";
import HomeProfessor from "./pages/HomeProfessor";
import Login from "./pages/Login";

function App(props) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(false);
  }, []);

  return (
    <>
      <Router>
        <Navbar login={login} />
        <Routes>
          <Route exact path="/" element={<Base />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home-aluno" element={<HomeAluno />} />
          <Route exact path="/home-prof" element={<HomeProfessor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
