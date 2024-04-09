import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import Notify from './Notify'
import styles from './Component.module.css'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('mlukkai')
  const [password, setPassword] = useState('secret')
  const [error, setError] = useState()


  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }
  const padding = { "padding": "15px"}
  return (
    <div style = {padding}>
      <Notify errorMessage = {error}/>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className={styles.lnk} type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setToken: PropTypes.func
}

export default LoginForm