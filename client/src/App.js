import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LandingPage from './pages/landingPage/LandingPage.js'
import HomePage from "./pages/homePage/HomePage";
import DetailPage from "./pages/detailPage/DetailPage"
import PostPage from "./pages/postPage/PostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/recipe/:id" element={<DetailPage />}/>
        <Route path='/post' element={<PostPage />} />
      </Routes>
        
    </Router>
  );
}

export default App;
