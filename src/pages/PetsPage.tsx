import React, { useEffect, useState } from 'react'
import PetCard from '../components/PetCard'
import { listPets } from '../services/api'
import { PetResponse } from '../types'

export default function PetsPage() {
  const [pets, setPets] = useState<PetResponse[]>([])
  const [loading, setLoading] = useState(true)

  // filtros opcionales
  const [especie, setEspecie] = useState('')
  const [minEdad, setMinEdad] = useState<number | undefined>()
  const [maxEdad, setMaxEdad] = useState<number | undefined>()
  const [centro, setCentro] = useState('')

  useEffect(() => {
    let mounted = true
    listPets(especie, minEdad, maxEdad, centro)
      .then((data) => { if (mounted) setPets(data) })
      .catch(console.error)
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [especie, minEdad, maxEdad, centro])

  return (
    <div className="container">
      <h2>Mascotas disponibles</h2>

      {/* filtros simples */}
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Especie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="number"
          placeholder="Edad min"
          value={minEdad ?? ''}
          onChange={(e) => setMinEdad(e.target.value ? parseInt(e.target.value) : undefined)}
          style={{ marginRight: 8 }}
        />
        <input
          type="number"
          placeholder="Edad max"
          value={maxEdad ?? ''}
          onChange={(e) => setMaxEdad(e.target.value ? parseInt(e.target.value) : undefined)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Centro"
          value={centro}
          onChange={(e) => setCentro(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : pets.length === 0 ? (
        <p>No hay mascotas disponibles</p>
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