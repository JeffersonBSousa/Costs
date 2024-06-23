import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import Projects from './components/pages/Projects';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Project from './components/pages/Project';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="minHeight">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/company" element={<Company />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/newproject" element={<NewProject />}></Route>
          <Route path="/project/:id" element={<Project />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>

  );
}

export default App;
