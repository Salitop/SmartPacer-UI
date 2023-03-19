import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route defaultView path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
