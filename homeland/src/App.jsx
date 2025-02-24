import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Boliger } from './pages/Boliger';
import { Login } from "./pages/Login";
import { Forside } from "./pages/Forside";
import { Nav } from "./components/navigation/Nav";

function App() {
  

  return (
    <> 
      <Router>
        <Nav/>
        <Routes>
          <Route path="/pages/" element={<Forside />} />
          <Route path="/pages/Boliger" element={<Boliger />} />
          <Route path="/pages/Login" element={<Login />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
