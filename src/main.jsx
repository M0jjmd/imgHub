import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage.jsx'
import LikedPage from './pages/LikedPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './app/store.js'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="liked" element={<LikedPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}