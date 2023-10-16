const LoggedComponent = ({user, handleLogout}) => (
  <p>{user.name} logged in
  <button
      id ='logout_button'
      type='submit'
      onClick={handleLogout}
    >
      Logout
  </button>
</p>
)

export default LoggedComponent