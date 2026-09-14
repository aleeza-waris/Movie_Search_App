import MovieCard from "./MovieCard";

function MovieGrid({ movies,onMovieClick ,favorites,
  onToggleFavorite, }) {
  return (
    <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-5 px-5 sm:grid-cols-3 lg:grid-cols-5">
      {movies.map((movie) => (
  <MovieCard
  key={movie.imdbID}
  movie={movie}
  onMovieClick={onMovieClick}
  isFavorite={favorites.some(
    (favorite) => favorite.imdbID === movie.imdbID
  )}
  onToggleFavorite={onToggleFavorite}
/>
      ))}
    </div>
  );
}

export default MovieGrid;