import { useEffect, createContext, useContext, useReducer } from 'react'
import blogService from './services/blogs'

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const sessionExpired = window.localStorage.getItem('sessionExpired')
    if (loggedUserJSON && sessionExpired) {
      const expire = JSON.parse(sessionExpired)
      if (expire.date > Date.now()) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      } else {
        window.localStorage.removeItem('sessionExpired')
        window.localStorage.removeItem('loggedUser')
      }
    }
  }, [])

  const setUser = (user) => {
    userDispatch({ type: "SET_USER", payload: user})
  }

  return (
    <UserContext.Provider value = { [user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndSet = useContext(UserContext)
  return userAndSet[0]
}

export const useSetUser = () => {
  const userAndSet = useContext(UserContext)
  return userAndSet[1]
}


export default UserContext