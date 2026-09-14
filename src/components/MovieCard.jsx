import { Heart } from 'lucide-react';
function MovieCard({
  movie,
  onMovieClick,
  isFavorite,
  onToggleFavorite,
}) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <article
      onClick={() => onMovieClick(movie.imdbID)}
      className="relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={poster}
        alt={movie.Title}
        className="h-72 w-full object-cover"
      />

      <button
        type="button"
        aria-label={
          isFavorite
            ? "Remove from favourites"
            : "Add to favourites"
        }
        onClick={(event) => {
          event.stopPropagation();
          onToggleFavorite(movie);
        }}
        className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-2xl shadow hover:scale-110"
      >
        <Heart
  size={22}
  className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}
/>
      </button>

      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {movie.Title}
        </h2>

        <p className="mt-2 text-gray-500">
          {movie.Year}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;