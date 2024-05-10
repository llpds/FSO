import axios from 'axios'


const getWeather = ({country}) => {

    const [lat, lon] = country.capitalInfo.latlng ? country.capitalInfo.latlng : country.latlng
    const api_key = process.env.REACT_APP_API_KEY
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const exportedObj = {getWeather} //prevent warning  eslint: Assign object to a variable before exporting as module default

export default exportedObj