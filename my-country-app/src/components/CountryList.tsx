import { useEffect, useState } from "react";
import type { Country as CountryType } from "../types/country";
import Country from "./Country";


function CountryList() {
  const [counties, setCountries] = useState<CountryType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading countries…</p>;
  }

  return (
    <div>
      <header>
        <button>Toggle</button>

        <form>
          <div>
            <label htmlFor="continent-search">Search by continent name</label>
            <input type="search" />
          </div>

          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        <article>
          {error ? (
            <p>{error}</p>
          ) : counties.length > 0 ? (
            counties.map((cont) => <Country key={cont.id} {...cont} />)
          ) : (
            <p>No countries found.</p>
          )}
        </article>
      </main>
    </div>
  );
}

export default CountryList;
