import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004',
  timeout: 5000
})

export async function getPet(id: string) {
  const res = await api.get(`/mascotas/${id}/perfil_completo`)
  return res.data
}

export async function listAdoptedPets() {
  const res = await api.get('/adoptadas')
  return res.data
}

export default api
