const Input = ({text, newValue, handleAction}) => (
    <div>
      {text}: <input id = "newName" value = {newValue} onChange = {handleAction}/>
    </div>
  )

export default Input  