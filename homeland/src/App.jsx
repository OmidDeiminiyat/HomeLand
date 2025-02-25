import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Boliger } from './pages/Boliger';
import { Login } from "./pages/Login";
import { Forside } from "./pages/Forside";
import { Nav } from "./components/navigation/Nav";
import { Footer } from "./components/footer/Footer";
import { Details } from "./components/details/Detail";
import { Admin } from "./components/admin/Admin";

function App() {
  

  return (
    <> 
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Forside />} />
          <Route path="/pages/Boliger" element={<Boliger />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
    </Router>
    </>
  )
}

export default App
