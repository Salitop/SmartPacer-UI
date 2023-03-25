import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ViewPacer from "./Components/ViewPacer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route defaultView path="/" element={<Login />} />
          <Route exact path="/viewPacer" element={<ViewPacer/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
