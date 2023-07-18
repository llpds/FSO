// validate inputed data,  operations with object of person
const validate = ({persons, name, number}) => {
    const numberCorrespondence  = persons.find(person => person.number === number)
    const nameCorrespondence = persons.find(person => person.name.toLowerCase() === name.toLowerCase())

    if(name === '' || number === '') return {
        status: 'err',
        msg: `both fields (name and number) must be filled`,
        data: undefined
      }
  
    if (numberCorrespondence) 
    return {
      status: 'err',
      msg: `Phone number ${number} is already added to phonebook and belongs to ${numberCorrespondence.name}`,
      data: undefined
    }  

    if(nameCorrespondence) 
      return {
        status: 'changeNumber',
        msg: `${nameCorrespondence.name} was changeda to ${number}`,
        data: {
          id: nameCorrespondence.id,
          name: nameCorrespondence.name,
          number: number
        }
      }

    return  { status: 'addPerson',
              msg: `${name} is added`,
              data: {
                id: new Date().getTime(),
                name: name,
                number: number
              }
            }
}



const exportedObj = {validate} //prevent warning  eslint: Assign object to a variable before exporting as module default

export default exportedObj