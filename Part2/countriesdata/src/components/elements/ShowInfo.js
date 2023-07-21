const ShowCountry = ({country}) =>  {
    
    return(
        <div>
            <h2> {country.name.common}</h2>
            <br />
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <br />
            <h4>languages:</h4>
            <br />
            <ul>
                {Object.keys(country.languages).map(l => <li key={l}>{country.languages[l]}</li>)}
            </ul>
            <img src={country.flags.svg} alt={country.name} width="25%" height="25%"/>
        </div>
    )
}

export default ShowCountry