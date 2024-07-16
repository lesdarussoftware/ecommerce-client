import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { UserProvider } from './providers/UserProvider'

import { Home } from './pages/Home'

import './App.css'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
