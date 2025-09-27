import React, { useEffect, useState } from 'react'
import PetCard from '../components/PetCard'
import { listPets } from '../services/api'
import { PetResponse } from '../types'

export default function HomePage() {
  const [pets, setPets] = useState<PetResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    listPets()  // Puedes pasar filtros si quieres: especie, minEdad, etc
      .then((data) => { if (mounted) setPets(data) })
      .catch(console.error)
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <div className="container">
      <h2>Mascotas disponibles</h2>
      {loading ? <p>Cargando...</p> : pets.length === 0 ? (
        <p>No hay mascotas disponibles</p>
      ) : (
        <div className="pet-grid">
          {pets.map(p => <PetCard key={p.id} pet={p} />)}
        </div>
      )}
    </div>
  )
}
