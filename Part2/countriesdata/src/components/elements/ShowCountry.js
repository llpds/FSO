import Button from './Button'

const ShowCountry = ({country, setFilter, index}) =>  {

    const nameMatch = () => {
        setFilter(['matched', country.name.common])
    }

    return(
        <tr>
            <td>{index}.</td>
            <td>{country.name.common}</td>
            <td><Button text = "Show" handleClick ={nameMatch}/></td>
        </tr>    
    )
}

export default ShowCountry