import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { UserProvider } from './providers/UserProvider'

import { Home } from './pages/Home'
import { History } from './pages/History'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/historial' element={<History />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
