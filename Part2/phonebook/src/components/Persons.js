import ShowPerson from './elements/ShowPerson'


const Persons = ({persons, filter}) => {

    const filtered = persons.filter(function(person){
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })


    return(
      <table>
        <tbody>
          {filtered.map(person => <ShowPerson key = {person.id} name = {person.name} number = {person.number} />)}
        </tbody>
      </table>
    )
  }

  export default Persons