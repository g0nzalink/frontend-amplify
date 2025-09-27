import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPet } from '../services/api'

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getPet(id)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="container">Cargando...</div>
  if (!data) return <div className="container">No encontrado</div>

  return (
    <div className="container">
      <h2>{data.mascota.name}</h2>
      <div className="card">
        <h3>Información</h3>
        <p>Especie: {data.mascota.species}</p>
        <p>Raza: {data.mascota.breed}</p>
        <p>Estado: {data.mascota.adoption_status?.state ?? 'desconocido'}</p>
      </div>
      <div style={{ marginTop: 12 }} className="card">
        <h3>Historia</h3>
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(data.historia, null, 2)}
        </pre>
      </div>
    </div>
  )
}