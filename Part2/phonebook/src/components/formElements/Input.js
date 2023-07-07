const Input = ({text, newValue, handleAction}) => (
    <div>
      {text}: <input id = {text} value = {newValue} onChange = {handleAction} />
    </div>
  )

export default Input  