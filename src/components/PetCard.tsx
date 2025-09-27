import React from 'react'
import { Link } from 'react-router-dom'
import { PetResponse } from '../types'

export default function PetCard({ pet }: { pet: PetResponse }) {
  return (
    <div className="card">
      <h3>{pet.nombre}</h3>
      <p style={{ margin: '4px 0' }}>
        {pet.especie} • {pet.raza} • {pet.edad} años
      </p>
      <p style={{ margin: '4px 0', fontSize: '0.9rem', color: '#6b7280' }}>
        Estado: {pet.estado_adopcion.estado}
      </p>
      <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#6b7280' }}>
        Centro: {pet.centro_adopcion.nombre}
      </p>
      <div style={{ marginTop: 8 }}>
        <Link to={`/pets/${pet.id}`}>Ver perfil</Link>
      </div>
    </div>
  )
}
