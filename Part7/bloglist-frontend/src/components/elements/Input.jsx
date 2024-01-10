// input: text is used for label and id, other data - standart input attribute
// output: input element

const Input = ({ text, ...props }) => (
  <div>
    {text}: <input id={text + 'Input'} {...props} />
  </div>
)

export default Input
