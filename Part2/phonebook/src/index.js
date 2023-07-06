import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const data = [
    { 
      id: 1,
      name: 'Arto Hellas',
      number: '040-1234567',
    },
    { 
      id: 2,
      name: 'Aarto Hellaas',
      number: '040-12345677777',
    },
  ]

ReactDOM.createRoot(document.getElementById('root')).render(<App data = {data}/>)