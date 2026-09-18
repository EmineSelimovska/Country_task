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
    return <p>Loading countries…</p>;
  }

  return (
    <div 
    className={
      darkMode ? 
      "min-h-screen bg-white text-black" :
      "min-h-screen bg-black text-white"
    }
    >
      <header>
        <button 
        type="button"
        onClick={() => setDarkMode((prev) => !prev)}>
            
            {darkMode ? "Light mode" : "Dark mode"}
            </button>

        <form
          onClick={(e) => {
            e.preventDefault();
            setSearchTerm(searchInput);
          }}
        >
          <div>
            <label htmlFor="continent-search">Search by name</label>
            <input
              type="search"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>

          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        <article>
          {error ? (
            <p>{error}</p>
          ) : visiableCountries.length > 0 ? (
            visiableCountries.map((cont) => <Country key={cont.id} {...cont} />)
          ) : (
            <p>No countries found.</p>
          )}
        </article>
      </main>
    </div>
  );
}

export default CountryList;
