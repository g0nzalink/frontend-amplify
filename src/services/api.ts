import axios from 'axios'
import { mockPets } from './mockPets'
import { PetResponse } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001',
  timeout: 5000
})


export async function listPets(): Promise<PetResponse[]> {
  return new Promise((resolve) => setTimeout(() => resolve(mockPets), 500))
}

export async function getPet(id: string): Promise<PetResponse | undefined> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockPets.find(p => p.id === id)), 500)
  )
}

// Crear mascota
export async function createPet(payload: Partial<PetResponse>) {
  const res = await api.post('/pets', payload)
  return res.data
}

// Actualizar estado de adopción
export async function updatePetState(id: string, estado: string) {
  const res = await api.patch(`/pets/${id}/estado`, { estado })
  return res.data
}

export default api
