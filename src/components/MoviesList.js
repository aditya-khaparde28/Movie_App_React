import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

const MoviesList = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err));
  }, [type, page]);

  return (
    <div className="movies-list">
      <h1>{type.replace("_", " ").toUpperCase()}</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="movie-card">
              <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default MoviesList;
