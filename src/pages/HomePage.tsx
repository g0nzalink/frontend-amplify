import React, { useEffect, useState } from 'react'
import PetCard from '../components/PetCard'
import { listAdoptedPets } from '../services/api'
import { PetResponse } from '../types'

export default function HomePage() {
  const [pets, setPets] = useState<PetResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    listAdoptedPets()
      .then((data) => {
        if (mounted) setPets(data)
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  return (
    <div className="container">
      <h2>Adoptadas</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : pets.length === 0 ? (
        <p>No hay mascotas adoptadas aún</p>
      ) : (
        <div className="pet-grid">
          {pets.map((p) => (
            <PetCard key={p.id} pet={p} />
          ))}
        </div>
      )}
    </div>
  )
}