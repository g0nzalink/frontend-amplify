import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
)
}