import ShowPerson from './elements/ShowPerson'


const Persons = ({persons, filter}) => {

    const filtered = persons.filter(function(person){
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })


    return(
      <ul>
        {filtered.map(person => <ShowPerson key = {person.id} name = {person.name} number = {person.number} />)}
      </ul>
    )
  }

  export default Persons