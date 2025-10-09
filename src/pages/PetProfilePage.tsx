import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPerfilCompleto } from "../services/api";

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const numId = Number(id);
    if (isNaN(numId)) {
      console.error("ID inválido:", id);
      setLoading(false);
      return;
    }

    getPerfilCompleto(numId)
      .then((res) => setData(res))
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Cargando...</p>;
  if (!data?.mascota && !data?.pet) return <p className="p-8">Mascota no encontrada</p>;

  const pet = data.mascota ?? data.pet ?? data;

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-2">{pet.nombre ?? pet.name}</h2>
      <p>{pet.especie ?? pet.species} — {pet.raza ?? pet.breed}</p>

      {data.historia && (
        <section className="mt-4">
          <h3 className="font-semibold mb-2">Historia</h3>
          <pre className="whitespace-pre-wrap">{data.historia}</pre>
        </section>
      )}

      {data.solicitudes && Array.isArray(data.solicitudes) && (
        <section className="mt-4">
          <h3 className="font-semibold mb-2">Solicitudes</h3>
          <ul className="list-disc list-inside">
            {data.solicitudes.map((s, i) => (
              <li key={i}>{s.estado ?? JSON.stringify(s)}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
