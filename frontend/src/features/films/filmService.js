import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/movie/popular";

// Get popular films
const getPopularFilms = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const filmService = { getPopularFilms };

export default filmService;
