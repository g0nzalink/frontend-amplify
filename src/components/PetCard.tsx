import React from 'react'
import { Link } from 'react-router-dom'
import { PetResponse } from '../types'

export default function PetCard({ pet }: { pet: PetResponse }) {
  return (
    <div className="card">
      <h3>{pet.name}</h3>
      <p style={{ margin: 0 }}>
        {pet.species} • {pet.breed}
      </p>
      <div style={{ marginTop: 8 }}>
        <Link to={`/pets/${pet.id}`}>Ver perfil</Link>
      </div>
    </div>
  )
}