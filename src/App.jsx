import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";
import Pagination from "./components/Pagination";
import Favorites from "./pages/Favorites";

const API_KEY = "c172bc7b";
const BASE_URL = "https://www.omdbapi.com/";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Fetch movies
  useEffect(() => {
    if (!query.trim()) {
      fetchMovies("movie", currentPage);
      return;
    }

    const timer = setTimeout(() => {
      fetchMovies(query, currentPage);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query, currentPage]);

  async function fetchMovies(searchValue, page) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${searchValue}&page=${page}`
      );

      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error);
        return;
      }

      setMovies(data.Search);
      setTotalResults(Number(data.totalResults));
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(searchValue) {
    setCurrentPage(1);
    setQuery(searchValue);
  }

  async function handleMovieClick(imdbID) {
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );

      const data = await response.json();

      if (data.Response === "False") {
        return;
      }

      setSelectedMovie(data);
    } catch (error) {
      console.error(error);
    }
  }

  function toggleFavorite(movie) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.imdbID === movie.imdbID
      );

      const updatedFavorites = alreadyFavorite
        ? currentFavorites.filter(
            (favorite) => favorite.imdbID !== movie.imdbID
          )
        : [...currentFavorites, movie];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  }

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <main>
              <h2 className="mt-10 text-center text-4xl font-bold">
                Discover movies you'll love.
              </h2>

              <SearchBar onSearch={handleSearch} />

              {loading && (
                <p className="mt-10 text-center text-lg">
                  Loading movies...
                </p>
              )}

              {!loading && error && (
                <p className="mt-10 text-center text-lg text-red-600">
                  {error}
                </p>
              )}

              {!loading && !error && movies.length === 0 && (
                <p className="mt-10 text-center text-lg">
                  Search for a movie to see results.
                </p>
              )}

              {!loading && !error && movies.length > 0 && (
                <MovieGrid
                  movies={movies}
                  onMovieClick={handleMovieClick}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              )}

              {movies.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </main>
          }
        />

        {/* Favourites */}
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onMovieClick={handleMovieClick}
            />
          }
        />
      </Routes>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </BrowserRouter>
  );
}

export default App;
