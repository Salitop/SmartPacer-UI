import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ViewPacer from "./Components/ViewPacer";
import CadastrarPacer from "./Components/CadastrarPacer"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route defaultView path="/" element={<Login />} />
          <Route exact path="/viewPacer" element={<ViewPacer/>}/>
          <Route exact path="/cadastrarPacer" element={<CadastrarPacer/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
