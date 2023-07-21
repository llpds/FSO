import Button from './Button'

const ShowCountry = ({country, filter, setFilter, index}) =>  {

    const nameMatch = () => {
        setFilter(['matched', country.name.common])
    }

    return(
        <tr>
                <td>{index}.</td>
                <td>{country.name.common}</td>
                {(filter.toLowerCase() === country.name.common.toLowerCase()) ? <td><Button text = "Complete match" handleClick ={nameMatch}/></td> : <td></td> }
        </tr>    
    )
}

export default ShowCountry