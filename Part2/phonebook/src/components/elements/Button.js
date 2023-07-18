// usual button, button element has name as 'text' and action as 'handleClick'
// <Button text = "buttonName" handleClick = {actionName}/>
//in case when button has no action: type will be 'submit'
// idea: pass all specified properties to the button / think later how to do

const Button = ({text, handleClick}) =>(
  <div>
    <button id = {text + "Button"} onClick = {handleClick} type={handleClick !== undefined ? 'button' : 'submit'}>{text}</button>
  </div>
)

export default Button