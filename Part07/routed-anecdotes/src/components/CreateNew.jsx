import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"
import { useField } from '../hooks/index'

const CreateNew = ({ addNew }) => {
  const [content, resetContent] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [info, resetInfo] = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const resetFields = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={resetFields}>reset</button>
      </form>
    </div>
  )

}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired
}

export default CreateNew