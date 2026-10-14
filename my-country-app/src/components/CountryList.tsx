import {useEffect, useState } from "react";
import type { Country as CountryType } from "../types/country";
import Country from "./Country";

function CountryList() {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const getCountries = async (): Promise<CountryType[]> => {
    const response = await fetch("/api/countries.json");

    if (!response.ok) {
      throw new Error("Request is not successful.");
    }

    return response.json();
  };

  const fetchCountry = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getCountries();
      setCountries(data);
    } catch (error) {
      console.error("Request failed", error);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadCountries = async () => {
      try {
        const data = await getCountries();

        if (!cancelled) {
          setCountries(data);
        }
      } catch (error) {
        console.error("Request failed", error);

        if (!cancelled) {
          setError("Something went wrong. Try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCountries();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const filterCountries = countries.filter((cont) => {
    const matchesSearch = cont.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesContinent =
      selectedContinent === "All" || cont.continent === selectedContinent;

    return matchesSearch && matchesContinent;
  });

  const visibleCountries = filterCountries.slice(0, 12);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchInput(value);

    if (value.trim() === "") {
      setSearchTerm("");
    }
  };

  const continents = [
    ...new Set(countries.map((country) => country.continent)),
  ].sort();

  if (loading) {
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-center gap-4 px-4 ${
          darkMode ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
        aria-busy="true"
      >
        <div
          className={`h-10 w-10 animate-spin rounded-full border-4 ${
            darkMode
              ? "border-gray-700 border-t-white"
              : "border-gray-200 border-t-gray-900"
          }`}
          role="status"
          aria-label="Loading countries"
        />

        <p className="text-sm font-medium tracking-wide">Loading countries…</p>
      </div>
    );
  }

  return (
    <div
      className={
        darkMode
          ? "min-h-screen w-full bg-black px-4 py-6 text-white sm:px-6 lg:px-8"
          : "min-h-screen w-full bg-white px-4 py-6 text-black sm:px-6 lg:px-8"
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
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "Light mode" : "Dark mode"}
        </button>

        <form
          className="flex w-full flex-col gap-4 sm:max-w-3xl sm:flex-row sm:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTerm(searchInput.trim());
          }}
        >
          <div className="min-w-0 flex-1">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
              htmlFor="country-search"
            >
              Search by name
            </label>

            <input
              id="country-search"
              type="search"
              placeholder="e.g. Bulgaria"
              className={`mt-1 w-full rounded-md border px-3 py-2 outline-none transition-colors focus:ring-2 ${
                darkMode
                  ? "border-gray-600 bg-gray-900 text-white placeholder:text-gray-400 focus:border-gray-300 focus:ring-gray-600"
                  : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-300"
              }`}
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>

          <div className="min-w-0 flex-1">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
              htmlFor="continent-filter"
            >
              Filter by continent
            </label>

            <select
              id="continent-filter"
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className={`mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ${
                darkMode
                  ? "border-gray-600 bg-gray-900 text-white focus:border-gray-300 focus:ring-gray-600"
                  : "border-gray-300 bg-white text-gray-900 focus:border-gray-500 focus:ring-gray-300"
              }`}
            >
              <option value="All">All continents</option>

              {continents.map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>

          <button
            className={`w-full rounded-md border px-5 py-2 font-medium transition-colors focus:outline-none focus:ring-2 sm:w-auto ${
              darkMode
                ? "border-gray-600 bg-white text-gray-900 hover:bg-gray-200 focus:ring-gray-500"
                : "border-gray-700 bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-400"
            }`}
            type="submit"
          >
            Search
          </button>
        </form>
      </header>

      <main className="mx-auto mt-8 w-full max-w-7xl">
        {error ? (
          <div
            role="alert"
            className={`rounded-lg border p-6 text-center ${
              darkMode
                ? "border-red-800 bg-red-950 text-red-100"
                : "border-red-200 bg-red-50 text-red-900"
            }`}
          >
            <h2 className="text-lg font-semibold">Something went wrong</h2>

            <p className="mt-2">{error}</p>

            <button
              type="button"
              onClick={fetchCountry}
              disabled={loading}
              className={`mt-4 rounded-md border px-4 py-2 font-medium transition-colors ${
                darkMode
                  ? "border-red-700 hover:bg-red-900"
                  : "border-red-300 hover:bg-red-100"
              }`}
            >
              {loading ? "Loading…" : "Try again"}
            </button>
          </div>
        ) : visibleCountries.length > 0 ? (
          <ul className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCountries.map((country) => (
              <li key={country.name} className="flex min-w-0">
                <Country {...country} />
              </li>
            ))}
          </ul>
        ) : (
          <div
            className={`rounded-lg border p-8 text-center ${
              darkMode
                ? "border-gray-700 bg-gray-900 text-gray-200"
                : "border-gray-200 bg-gray-50 text-gray-700"
            }`}
          >
            <h2 className="text-lg font-semibold">No countries found</h2>
            <p className="mt-2 text-sm">
              Try another country name or select a different continent.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default CountryList;
