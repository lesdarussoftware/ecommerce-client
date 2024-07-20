import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './providers/AuthProvider'

import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { History } from './pages/History'
import { MySales } from './pages/MySales'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tienda' element={<Store />} />
          <Route path='/historial' element={<History />} />
          <Route path='/ventas' element={<MySales />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
