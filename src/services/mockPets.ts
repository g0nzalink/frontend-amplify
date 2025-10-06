// src/services/TSmockPets.ts
import type { Pet, HistoryItem, RequestDto } from "../types/index";

let pets: Pet[] = [
  {
    id: "pet-1",
    name: "Luna",
    breed: "Schnauzer",
    image_url: "https://images.dog.ceo/breeds/schnauzer-miniature/n02097130_3000.jpg",
    birth_date: "2021-05-10",
    created_at: "2022-01-10T10:00:00Z",
    adoption_status: { state: "available" },
    vacunas: [],
  },
  {
    id: "pet-2",
    name: "Nube",
    breed: "Gato Europeo",
    image_url: "https://placekitten.com/800/400",
    birth_date: "2020-02-14",
    created_at: "2022-04-01T08:00:00Z",
    adoption_status: { state: "adopted" },
    vacunas: [],
  },
  {
    id: "pet-3",
    name: "Rocco",
    breed: "Labrador",
    image_url: "https://images.dog.ceo/breeds/labrador/n02099712_3500.jpg",
    birth_date: "2019-11-03",
    created_at: "2023-02-20T12:00:00Z",
    adoption_status: { state: "available" },
    vacunas: [],
  },
  {
    id: "pet-4",
    name: "Misu",
    breed: "Siamese",
    image_url: "https://placekitten.com/700/400",
    birth_date: "2022-07-30",
    created_at: "2024-05-12T12:00:00Z",
    adoption_status: { state: "en_proceso" },
    vacunas: [],
  },
];

let histories: Record<string, HistoryItem[]> = {
  "pet-1": [
    { id: "h1", petId: "pet-1", note: "Rescatada en la calle", created_at: "2021-05-11T09:00:00Z" },
    { id: "h2", petId: "pet-1", note: "Vacunada", created_at: "2022-02-01T09:00:00Z" },
  ],
  "pet-2": [{ id: "h3", petId: "pet-2", note: "En adopción desde 2022", created_at: "2022-03-01T09:00:00Z" }],
  "pet-3": [],
  "pet-4": [{ id: "h4", petId: "pet-4", note: "Chequeo veterinario", created_at: "2024-05-13T09:00:00Z" }],
};

let requests: any[] = [
  { id: "r1", userId: "user-1", petId: "pet-2", message: "Quisiera adoptarla", date: "2024-06-01T10:00:00Z", status: "approved" },
];

export const sleep = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const listPetsMock = async (params?: Record<string, any>) => {
  await sleep(150);
  // Implement simple filter by state
  if (params?.state) {
    const results = pets.filter((p) => (p.adoption_status?.state ?? p.estado_adopcion?.estado) === params.state);
    return { data: { results } };
  }
  return { data: { results: pets } };
};

export const getPerfilCompletoMock = async (id: string) => {
  await sleep(150);
  const pet = pets.find((p) => p.id === id);
  if (!pet) throw new Error("Not found");
  return {
    data: {
      pet,
      histories: histories[id] ?? [],
      requests: requests.filter((r) => r.petId === id),
    },
  };
};

export const listAdoptadasMock = async () => {
  await sleep(120);
  const results = pets.filter((p) => p.adoption_status?.state === "adopted");
  return { data: { results } };
};

export const createRequestMock = async (body: RequestDto & { userId?: string }) => {
  await sleep(200);
  const id = `r-${Math.random().toString(36).slice(2, 9)}`;
  const record = {
    id,
    userId: body.userId ?? "anonymous",
    petId: body.petId,
    message: body.message ?? "",
    date: body.date ?? new Date().toISOString(),
    status: "pending",
  };
  requests.push(record);
  return { data: record, status: 201 };
};

export default { listPetsMock, getPerfilCompletoMock, listAdoptadasMock, createRequestMock };
