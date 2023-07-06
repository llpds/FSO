import SubmBtn from './formElements/SubmBtn'
import Input from './formElements/Input'



const Form = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => (
    <div>      
      <form onSubmit = {addName}>
        <Input text = 'name' newValue = {newName} handleAction = {handleNameChange} />
        <Input text = 'number' newValue = {newNumber} handleAction = {handleNumberChange} />
        <SubmBtn text = "add" />
      </form>
    </div>
  )

  export default Form