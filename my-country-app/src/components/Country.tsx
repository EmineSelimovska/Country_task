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

 if(continent === "North America"){
    continentStyle = "bg-blue-100 border-blue-400"
 }else if(continent === "Europe"){
    continentStyle = "bg-purple-100 border-purple-400"
 }else if(continent === "Asia"){
    continentStyle = "bg-yellow-100 border-yellow-400"
 }else if(continent ===  "South America"){
    continentStyle = "bg-green-100 border-green-400"
 }else if(continent === "Oceania"){
    continentStyle = "bg-gray-100 border-gray-400"
 }else if(continent === "Africa"){
    continentStyle = "bg-red-100 border-red-400"
 }
  return (
    <section>
      <img src={image} alt={name} />
      <div className={`${continentStyle}`}>
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