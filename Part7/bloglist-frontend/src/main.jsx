import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {  BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import { Container } from '@mui/material'

import './index.css'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <Container>
      <Router>
        <App />
      </Router>
    </Container>
  </Provider>
)
