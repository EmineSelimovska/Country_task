import type { Country as CountryType } from "../types/country";


const continentStyles: Record<string, string> = {
  "North America": "bg-blue-100 border-blue-400",
  Europe: "bg-purple-100 border-purple-400",
  Asia: "bg-yellow-100 border-yellow-400",
  "South America": "bg-green-100 border-green-400",
  Oceania: "bg-gray-100 border-gray-400",
  Africa: "bg-red-100 border-red-400",
};

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

   const continentStyle =
    continentStyles[continent] ?? "bg-gray-100 border-gray-400";
  
  return (
    <article className="flex h-full min-w-0 w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <img
        className="aspect-[16/9] w-full object-cover"
        src={image}
        alt={name}
      />
      <div
        className={`flex flex-1 flex-col border-t-4 p-4 text-gray-900 sm:p-5 ${continentStyle}`}
      >
        <div className="min-w-0">
          <h2 className="break-words text-xl font-bold tracking-tight sm:text-2xl">
            {name}
          </h2>
          <p className="mt-2 break-words text-sm leading-6 text-gray-700 sm:text-base">
            {shortInfo}
          </p>
        </div>
        <ul className="mt-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
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
    </article>
  );
}

export default Country;
