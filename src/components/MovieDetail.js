import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <h2>Cast</h2>
      <div className="cast-list">
        {cast.slice(0, 10).map((actor) => (
          <div key={actor.id} className="cast-card">
            <img
              src={actor.profile_path ? `${IMAGE_BASE}${actor.profile_path}` : "https://via.placeholder.com/100"}
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
