import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onSearch(query);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-2xl gap-3 px-4"
    >
      <input
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          onSearch(event.target.value);
        }}
        placeholder="Search for a movie..."
        className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
      />

      <button
        type="submit"
        className="rounded-md bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;