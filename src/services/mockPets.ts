import { PetResponse } from '../types'

export const mockPets: PetResponse[] = [
  {
    id: '1',
    nombre: 'Firulais',
    especie: 'Perro',
    raza: 'Labrador',
    edad: 3,
    centro_adopcion: {
      id: 'c1',
      nombre: 'Centro Canino Lima',
      direccion: 'Av. Siempre Viva 123',
      ciudad: 'Lima',
      lat: -12.0464,
      lon: -77.0428
    },
    estado_adopcion: {
      id: 'e1',
      estado: 'disponible',
      fecha_actualizacion: '2025-09-27'
    },
    vacunas: [
      { id: 'v1', tipo: 'Rabia', fecha: '2025-01-15' },
      { id: 'v2', tipo: 'Parvovirus', fecha: '2025-01-15' }
    ],
    created_at: '2025-01-01'
  },
  {
    id: '2',
    nombre: 'Michi',
    especie: 'Gato',
    raza: 'Siames',
    edad: 2,
    centro_adopcion: {
      id: 'c2',
      nombre: 'Refugio Gatuno',
      direccion: 'Calle Ficticia 456',
      ciudad: 'Cusco',
      lat: -13.5319,
      lon: -71.9675
    },
    estado_adopcion: {
      id: 'e2',
      estado: 'en_proceso',
      fecha_actualizacion: '2025-09-20'
    },
    vacunas: [
      { id: 'v3', tipo: 'Triple Felina', fecha: '2025-02-10' }
    ],
    created_at: '2025-02-01'
  },
  {
    id: '3',
    nombre: 'Rex',
    especie: 'Perro',
    raza: 'Pastor Alemán',
    edad: 5,
    centro_adopcion: {
      id: 'c1',
      nombre: 'Centro Canino Lima',
      direccion: 'Av. Siempre Viva 123',
      ciudad: 'Lima',
      lat: -12.0464,
      lon: -77.0428
    },
    estado_adopcion: {
      id: 'e3',
      estado: 'adoptada',
      fecha_actualizacion: '2025-08-15'
    },
    vacunas: [],
    created_at: '2024-12-01'
  }
]
