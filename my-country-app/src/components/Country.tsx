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
  return (
    <section>
      <img src={image} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>{shortInfo}</p>
        <p>{continent}</p>
        <p>{capital}</p>
        <p>{language}</p>
        <p>{population}</p>
        <p>{totalArea}</p>
      </div>
    </section>
  );
}


export default Country;