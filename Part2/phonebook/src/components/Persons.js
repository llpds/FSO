import ShowPerson from './elements/ShowPerson'


const Persons = ({persons, filter, setPersons}) => {

    const filtered = persons.filter(function(person){
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })


    return(
      <table>
        <tbody>
          {filtered.map(person => <ShowPerson key = {person.id} id = {person.id} name = {person.name} number = {person.number}  setPersons={setPersons} persons = {persons}/>)}
        </tbody>
      </table>
    )
  }

  export default Persons