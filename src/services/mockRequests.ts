export const mockRequests = [
  {
    id: "r1",
    mascota_id: "1",
    mascota: { nombre: "Luna" },
    fecha_solicitud: "2024-04-15",
    estado: "en_proceso",
    comentario: "Your request is being processed.",
  },
  {
    id: "r2",
    mascota_id: "2",
    mascota: { nombre: "Michi" },
    fecha_solicitud: "2024-05-01",
    estado: "aprobada",
    comentario: "Felicidades, fue aprobada 🎉",
  },
];

export async function listRequestsMock() {
  await new Promise((r) => setTimeout(r, 300));
  return mockRequests;
}

export async function getRequestDetailMock(id: string) {
  await new Promise((r) => setTimeout(r, 200));
  return mockRequests.find((r) => r.id === id);
}
