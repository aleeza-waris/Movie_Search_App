import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

        <h1 className="text-2xl font-bold">
          Movie Search
        </h1>

        {/* Desktop Menu */}
        <div className="hidden gap-6 sm:flex">
          <a href="/" className="hover:text-gray-300">
            Home
          </a>

          <a href="/favorites" className="hover:text-gray-300">
            My Favourites
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl sm:hidden"
        >
          ☰
        </button>

      </div>

      {/* Mobile Side Menu */}
      {menuOpen && (
        <div className="fixed right-0 top-0 z-50 h-full w-64 bg-gray-900 p-6 shadow-lg sm:hidden">

          <button
            onClick={() => setMenuOpen(false)}
            className="mb-10 text-2xl"
          >
            ✕
          </button>

          <div className="flex flex-col gap-6 text-lg">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              Home
            </a>

            <a
              href="/favorites"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              My Favourites
            </a>
          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;