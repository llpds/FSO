import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { makeComment } from '../reducers/blogReducer'
import { TextField, Box, Button } from '@mui/material'

const CommentForm = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  const handleComment =  event => {
    event.preventDefault()
    if(event.target.comment.value === '') {alert(
      'Field comment must be filled'
    )
    return
    }
    const comment = { content: event.target.comment.value }
    event.target.comment.value = ''
    dispatch(makeComment(id, comment))
  }

  return (
    <Box
      id="blogComment"
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
      onSubmit={handleComment}
    >
      <TextField
        id="blogComment"
        name="comment"
        label="Comment"
        variant="outlined"
        size = "small"
      />
      <Button variant="outlined" color="primary" type="submit" size = "large">
        Add comment
      </Button>
    </Box>
  )
}

export default CommentForm