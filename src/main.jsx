import React from 'react'
import ReactDOM from 'react-dom/client'
import "./assets/scss/main.scss"
import { BrowserRouter } from 'react-router-dom'
import HomePage from './Layout/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  </React.StrictMode>,
)
