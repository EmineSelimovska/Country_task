import { useEffect, useState } from "react";
import type { Country as CountryType } from "../types/country";
import Country from "./Country";

function CountryList() {
  const [counties, setCountries] = useState<CountryType[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
 return localStorage.getItem("theme") === "dark"
})

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("api/countries.json");

        if (!response.ok) {
          throw new Error("Request is not successful.");
        }

        const data: CountryType[] = await response.json();

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setCountries(data);
      } catch (error) {
        console.error("Request failed", error);
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, []);

  useEffect(() => {
   document.documentElement.classList.toggle("dark", darkMode);

   localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const filterCountries = counties.filter((cont) =>
    cont.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const visiableCountries = filterCountries.slice(0, 12);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchInput(value);

    if (value.trim() === "") {
      setSearchTerm("");
    }
  };

  if (loading) {
    return (
      <div
        className={
          darkMode
            ? "flex min-h-screen items-center justify-center bg-white px-4 text-black"
            : "flex min-h-screen items-center justify-center bg-black px-4 text-white"
        }
      >
        <p className="text-center text-lg font-semibold sm:text-xl">
          Loading countries…
        </p>
      </div>
    );
  }

  return (
    <div 
    className={
      darkMode ? 
      "min-h-screen w-full bg-white px-4 py-6 text-black sm:px-6 lg:px-8" :
      "min-h-screen w-full bg-black px-4 py-6 text-white sm:px-6 lg:px-8"
    }
    >
      <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <button 
        type="button"
        className={`w-full rounded-md border px-4 py-2 text-left transition-colors sm:w-auto ${
          darkMode
            ? "border-gray-400 bg-white text-black hover:bg-gray-100"
            : "border-gray-500 bg-gray-900 text-white hover:bg-gray-800"
        }`}
        onClick={() => setDarkMode((prev) => !prev)}>
            
            {darkMode ? "Light mode" : "Dark mode"}
            </button>

        <form
          className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row sm:items-end"
          onClick={(e) => {
            e.preventDefault();
            setSearchTerm(searchInput);
          }}
        >
          <div className="min-w-0 flex-1">
            <label
              className={darkMode ? "text-black" : "text-white"}
              htmlFor="continent-search"
            >
              Search by name
            </label>
            <input
              type="search"
              className={`mt-1 w-full rounded-md border px-3 py-2 outline-none transition-colors focus:ring-2 ${
                darkMode
                  ? "border-gray-400 bg-white text-black focus:border-gray-700 focus:ring-gray-400"
                  : "border-gray-500 bg-gray-900 text-white focus:border-gray-200 focus:ring-gray-500"
              }`}
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>

          <button
            className={`w-full rounded-md border px-4 py-2 transition-colors sm:w-auto ${
              darkMode
                ? "border-gray-400 bg-gray-100 text-black hover:bg-gray-200"
                : "border-gray-500 bg-gray-800 text-white hover:bg-gray-700"
            }`}
            type="submit"
          >
            Search
          </button>
        </form>
      </header>

      <main className="mx-auto mt-8 w-full max-w-7xl">
        <article className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {error ? (
            <p>{error}</p>
          ) : visiableCountries.length > 0 ? (
            visiableCountries.map((cont) => <Country key={cont.name} {...cont} />)
          ) : (
            <p>No countries found.</p>
          )}
        </article>
      </main>
    </div>
  );
}

export default CountryList;
