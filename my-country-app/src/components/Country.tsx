import type { Country as CountryType } from "../types/country";

function Country({
  name,
  shortInfo,
  image,
  continent,
  capital,
  language,
  population,
  totalArea,
}: CountryType) {
  let continentStyle = "";

  if (continent === "North America") {
    continentStyle = "bg-blue-100 border-blue-400";
  } else if (continent === "Europe") {
    continentStyle = "bg-purple-100 border-purple-400";
  } else if (continent === "Asia") {
    continentStyle = "bg-yellow-100 border-yellow-400";
  } else if (continent === "South America") {
    continentStyle = "bg-green-100 border-green-400";
  } else if (continent === "Oceania") {
    continentStyle = "bg-gray-100 border-gray-400";
  } else if (continent === "Africa") {
    continentStyle = "bg-red-100 border-red-400";
  }
  return (
    <section className="flex min-w-0 flex-col overflow-hidden rounded-lg border shadow-sm">
      <img
        className="aspect-[16/9] w-full object-cover"
        src={image}
        alt={name}
      />
      <div
        className={`flex flex-1 flex-col gap-4 p-4 text-gray-900 sm:p-5 ${continentStyle}`}
      >
        <div className="min-w-0">
          <h2 className="break-words text-xl font-semibold sm:text-2xl">
            <span className=" mr-1 font-bold">Name:</span>
            {name}
          </h2>
          <p className="mt-2 break-words text-sm leading-6 sm:text-base">
            {shortInfo}
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          <li className="break-words">
            <span className="font-bold">Continent:</span> {continent}
          </li>

          <li className="break-words">
            <span className="font-bold">Capital:</span> {capital}
          </li>

          <li className="break-words">
            <span className="font-bold">Language:</span> {language}
          </li>

          <li className="break-words">
            <span className="font-bold">Population:</span> {population}
          </li>

          <li className="break-words sm:col-span-2">
            <span className="font-bold">Total area:</span> {totalArea}
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Country;
