export type UUID = string

export interface CentroAdopcion {
  id: UUID
  nombre: string
  direccion: string
  ciudad: string
  lat: number
  lon: number
}

export interface Vacuna {
  id: UUID
  tipo: string
  fecha: string
}

export interface EstadoAdopcion {
  id: UUID
  estado: 'disponible' | 'en_proceso' | 'adoptada'
  fecha_actualizacion: string
}

export interface PetResponse {
  id: UUID
  nombre: string
  especie: string
  raza: string
  edad: number
  centro_adopcion: CentroAdopcion
  estado_adopcion: EstadoAdopcion
  vacunas: Vacuna[]
  created_at: string
}