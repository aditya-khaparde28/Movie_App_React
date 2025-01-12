import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MoviesList from "./components/MoviesList";
import MovieDetail from "./components/MovieDetail";
import SearchResults from "./components/SearchResults";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MoviesList type="popular" />} />
        <Route path="/top-rated" element={<MoviesList type="top_rated" />} />
        <Route path="/upcoming" element={<MoviesList type="upcoming" />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </Router>
    
  );
}

export default App;
