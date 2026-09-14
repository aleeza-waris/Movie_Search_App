import { Heart } from "lucide-react";

function Favorites({ favorites, onToggleFavorite, onMovieClick }) {
  return (
    <main>
      <h2 className="mt-10 text-center text-4xl font-bold">
        My Favourites
      </h2>

      {favorites.length === 0 ? (
        <p className="mt-10 text-center text-lg">
          You don't have any favourite movies yet.
        </p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-5 px-5 sm:grid-cols-3 lg:grid-cols-5">
          {favorites.map((movie) => {
            const poster =
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster";

            return (
              <article
                key={movie.imdbID}
                onClick={() => onMovieClick(movie.imdbID)}
                className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={poster}
                    alt={movie.Title}
                    className="h-72 w-full object-cover"
                  />

                  <button
                    type="button"
                    aria-label="Remove from favourites"
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleFavorite(movie);
                    }}
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow transition hover:scale-110"
                  >
                    <Heart
                      size={22}
                      className="fill-red-500 text-red-500"
                    />
                  </button>
                </div>

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
          })}
        </div>
      )}
    </main>
  );
}

export default Favorites;