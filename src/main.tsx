import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import PetProfilePage from './pages/PetProfilePage'
import { ApiProvider } from './contexts/ApiContext'
import PetsPage from './pages/PetsPage'
import './index.css'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="pets/:id" element={<PetProfilePage />} />
            <Route path="/pets" element={<PetsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>
)