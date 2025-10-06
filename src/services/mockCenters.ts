export const mockCenters = [
  {
    id: "c1",
    nombre: "Refugio Esperanza",
    direccion: "Av. Libertad 123",
    ciudad: "Lima",
  },
  {
    id: "c2",
    nombre: "Happy Paws",
    direccion: "Calle Los Olivos 456",
    ciudad: "Cusco",
  },
  {
    id: "c3",
    nombre: "Adopta Vida",
    direccion: "Jr. Primavera 789",
    ciudad: "Arequipa",
  },
];

export async function listCentersMock() {
  await new Promise((r) => setTimeout(r, 300));
  return mockCenters;
}
