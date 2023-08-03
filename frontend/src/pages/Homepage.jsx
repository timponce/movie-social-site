import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import FilmScroll from "../components/FilmScroll";
import FilmItem from "../components/FilmItem";
import { getPopularFilms, reset } from "../features/films/filmSlice";
import Spinner from "../components/Spinner";

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const { user } = useSelector((state) => state.auth);
  const { films, isLoading, isError, message } = useSelector(
    (state) => state.films
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user) {
    //     navigate("/login");
    //   }

    dispatch(getPopularFilms);
  }, [films, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Check out these movies</h1>
        <p>Popular Movies</p>
      </section>
      {/* <FilmScroll /> */}
      <section className="content">
        {films.length > 0 ? (
          <div className="lists">
            {films.map((film) => (
              <FilmItem key={film.id} film={film} />
            ))}
          </div>
        ) : (
          <h3>ERROR IN TMDB API</h3>
        )}
      </section>
    </>
  );
}

export default Homepage;
