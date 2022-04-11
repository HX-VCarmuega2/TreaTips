import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LandingPage from './pages/landingPage/LandingPage.js'
import HomePage from "./pages/homePage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route path="/home" element={<HomePage />}/>
      </Routes>
        
    </Router>
  );
}

export default App;
