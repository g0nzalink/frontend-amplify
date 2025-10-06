// PetProfilePage.tsx (ejemplo)
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPerfilCompleto } from "../services/api";
import PetCard from "../components/PetCard";

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getPerfilCompleto(id)
      .then((res) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Cargando...</p>;
  if (!data?.mascota && !data?.mascota) return <p className="p-8">Mascota no encontrada</p>;

  const pet = data.mascota ?? data.pet ?? data;

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-2">{pet.name ?? pet.nombre}</h2>
      <p>{pet.species ?? pet.especie} - {pet.breed ?? pet.raza}</p>
      {/* historia y solicitudes si vienen */}
      {data.historia && <section>{/* map historia */}</section>}
      {data.solicitudes && <section>{/* map solicitudes */}</section>}
    </main>
  );
}
