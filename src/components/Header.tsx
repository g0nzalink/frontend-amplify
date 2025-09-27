import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 style={{ margin: 0 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Adoption App
          </Link>
        </h1>
      </div>
    </header>
  )
}