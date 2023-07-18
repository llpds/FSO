import Button from './Button'
import personService from './../../services/person'

const Person = ({id, name, number, setPersons, persons}) =>  {
    const dltBtn = () => {
        if(window.confirm(`Delete ${name}`)) {
            console.log('delete clicked', id)
            personService
                .destroy(id)
                .then(
                    setPersons(persons.filter(p => p.id !== id))
                )
                .catch(err => console.log('err', err))
        }
    }

    return(
        <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{number}</td>
                <td><Button handleClick = {dltBtn} text = 'delete' /></td>
        </tr>    
    )
}

export default Person