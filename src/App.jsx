import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './providers/AuthProvider'
import { ContractProvider } from './providers/ContractProvider'

import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { History } from './pages/History'

function App() {
  return (
    <AuthProvider>
      <ContractProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tienda' element={<Store />} />
            <Route path='/historial' element={<History />} />
          </Routes>
        </BrowserRouter>
      </ContractProvider>
    </AuthProvider>
  )
}

export default App
