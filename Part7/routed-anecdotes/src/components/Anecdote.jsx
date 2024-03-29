import PropTypes from 'prop-types'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see  <a href ={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object
}

export default Anecdote