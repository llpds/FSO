import {useState} from 'react'
import weatherService from './../../services/weather'


const ShowWeather = ({country}) =>  {
    const [weather, setWeather] = useState(null)
    
    if(weather){
        const condIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        
        return(
            <div>
                <h2> Weather in {weather.name ? weather.name : country.name.common}</h2>
                <p>Temperature: {(weather.main.temp-273.15).toFixed(2)} Celsius </p>
                <img src={condIcon} alt="Weather Conditions" width="15%" height="15%"/>
                <p>Wind: {(weather.wind.speed/3.6).toFixed(2)} m/s</p>          
            </div>
        )
    }else{
        weatherService
            .getWeather({country})
            .then(w => setWeather(w))
    }
    
}

export default ShowWeather