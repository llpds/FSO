import ShowWeather from './ShowWeather'

import './ShowInfo.css'

const ShowInfo = ({country}) => (
    <div>
        <h1>{country.name.common ? country.name.common : country.name.official}</h1>
        <p>Capital: {country.capital ? country.capital: '-'}</p>
        <p>Area: {country.area<0 ? '61,399 km2' : country.area}</p>
        
        <h4>languages:</h4>
        <ul>
            {country.languages 
                ? Object.keys(country.languages).map(l => <li key={l}>{country.languages[l]}</li>)
                : <li>Oops looks like Here has no languages, at least official.</li>
            }
        </ul>
        <img src={country.flags.svg} alt={country.name} width="25%" height="25%"/>
        
        <ShowWeather country = {country} />
    </div>
)

export default ShowInfo