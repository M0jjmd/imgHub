import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
