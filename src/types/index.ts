export type UUID = string;

export interface CentroAdopcion {
  id: UUID;
  nombre?: string;
  direccion?: string;
  ciudad?: string;
  lat?: number;
  lon?: number;
}

export interface Vacuna {
  id: UUID;
  tipo?: string;
  fecha?: string;
}

export interface EstadoAdopcion {
  id?: UUID;
  estado?: 'disponible' | 'en_proceso' | 'adoptada' | string;
  fecha_actualizacion?: string;
}

/**
 * Nuevo tipo Pet, compatible con MS1/MS4 actuales.
 * Conserva campos flexibles para evitar roturas cuando faltan campos (ej created_at).
 */
export interface Pet {
  id: UUID;
  name?: string;           // nombre en MS4/MS1
  nombre?: string;         // mantengo por compatibilidad con tu antiguo shape
  species?: string;
  breed?: string;
  raza?: string;
  image_url?: string | null;
  birth_date?: string | null;
  edad?: number;
  created_at?: string | null;
  centro_adopcion?: CentroAdopcion;
  estado_adopcion?: EstadoAdopcion;
  adoption_status?: { state?: string; [k: string]: any } | null;
  vacunas?: Vacuna[];
  [k: string]: any;
}

export interface PaginatedPets {
  items: Pet[];
  total: number;
  page: number;
  size: number;
}

export interface HistoryItem {
  id: UUID;
  petId?: UUID;
  note?: string;
  created_at?: string;
  [k: string]: any;
}

export interface RequestDto {
  userId: UUID;
  petId: UUID;
  message?: string;
  date?: string;
}
