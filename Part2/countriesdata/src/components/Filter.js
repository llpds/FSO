const Filter = ({text, ...props}) => {

    return (
      <div>
        {text}: <input id = {text + 'Input'} {...props} />
      </div>
    )
  }

export default Filter