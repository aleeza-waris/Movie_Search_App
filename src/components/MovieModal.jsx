function MovieModal({ movie, onClose }) {
  if (!movie) {
    return null;
  }

  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-3xl text-gray-600 hover:text-black"
        >
          &times;
        </button>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row">
          <img
            src={poster}
            alt={movie.Title}
            className="mx-auto h-80 w-56 rounded-md object-cover sm:mx-0"
          />

          <div>
            <h2 className="text-2xl font-bold">
              {movie.Title}
            </h2>

            <p className="mt-3">
              <strong>Year:</strong> {movie.Year}
            </p>

            <p className="mt-2">
              <strong>Genre:</strong> {movie.Genre}
            </p>

            <p className="mt-2">
              <strong>Director:</strong> {movie.Director}
            </p>

            <p className="mt-2">
              <strong>Actors:</strong> {movie.Actors}
            </p>

            <p className="mt-2">
              <strong>IMDb Rating:</strong> {movie.imdbRating}
            </p>

            <p className="mt-4 leading-7">
              <strong>Plot:</strong> {movie.Plot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;