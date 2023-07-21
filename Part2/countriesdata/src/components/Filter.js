const Filter = ({text, ...props}) => (
  <div>
    {text}: <input id = {text + 'Input'} {...props} />
  </div>
)

export default Filter