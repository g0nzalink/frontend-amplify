import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPet } from '../services/api'
import { PetResponse } from '../types'

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [pet, setPet] = useState<PetResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getPet(id).then(setPet).catch(console.error).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="container">Cargando...</div>
  if (!pet) return <div className="container">No encontrado</div>

  return (
    <div className="container">
      <h2>{pet.nombre}</h2>
      <div className="card">
        <h3>Información</h3>
        <p>Especie: {pet.especie}</p>
        <p>Raza: {pet.raza}</p>
        <p>Edad: {pet.edad}</p>
        <p>Centro: {pet.centro_adopcion.nombre} ({pet.centro_adopcion.ciudad})</p>
        <p>Estado de adopción: {pet.estado_adopcion.estado}</p>
      </div>

      <div style={{ marginTop: 12 }} className="card">
        <h3>Vacunas</h3>
        {pet.vacunas.length === 0 ? (
          <p>No tiene vacunas registradas</p>
        ) : (
          <ul>
            {pet.vacunas.map(v => (
              <li key={v.id}>{v.tipo} - {v.fecha}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
