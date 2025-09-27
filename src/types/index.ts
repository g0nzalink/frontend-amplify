export type UUID = string


export interface PetResponse {
id: UUID
name: string
species: string
breed: string
birth_date: string
adoption_center_id: UUID
image_url?: string | null
created_at: string
}


export interface ApplicationView {
id: UUID
userId: UUID
petId: UUID
requestDate: string
status: string
statusDate: string
message: string
}


export interface HistoryResponse {
id: string
pet_id: UUID
history: { date: string; event: string }[]
images: string[]
details?: string
user_id?: string
meta?: Record<string, any>
}