import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { makeComment } from '../reducers/blogReducer'

const CommentForm = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  const handleComment =  event => {
    event.preventDefault()
    const comment = { content: event.target.comment.value }
    event.target.comment.value = ''
    dispatch(makeComment(id, comment))
  }

  return (
    <div>
      <form id="loginForm" onSubmit={handleComment}>
        <input type="text" id="blogComment" name="comment" autoComplete="off" />
        <button id="commentSubmitButton" type="submit">Add comment</button>
      </form>
    </div>
  )
}

export default CommentForm