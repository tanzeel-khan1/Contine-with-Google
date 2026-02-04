import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AuthSucess from './pages/AuthSuccess'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/success" element={<AuthSucess />} />
    </Routes>
  )
}

export default App











