const Button = ({text, handleClick}) =>(
  <div>
    <button id = {text + "Button"} onClick = {handleClick} type={handleClick !== undefined ? 'button' : 'submit'}>{text}</button>
  </div>
)

export default Button