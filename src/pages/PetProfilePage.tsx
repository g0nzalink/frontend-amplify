import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPerfilCompleto } from "../services/api";
import PetCard from "../components/PetCard";
import type { Pet } from "../types";

// Tipos para los datos del perfil completo
interface Historia {
  id: number;
  fecha: string;
  descripcion: string;
}

interface Solicitud {
  id: number;
  estado: string;
  fecha: string;
  adoptante?: string;
}

interface PerfilCompleto {
  mascota: Pet;
  historia?: Historia[];
  solicitudes?: Solicitud[];
}

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PerfilCompleto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getPerfilCompleto(Number(id))
      .then((res) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Cargando...</p>;
  if (!data?.mascota) return <p className="p-8">Mascota no encontrada</p>;

  const pet = data.mascota;

  return (
    <main className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-2">
          {pet.name ?? pet.nombre}
        </h2>
        <p>
          {pet.species ?? pet.especie} - {pet.breed ?? pet.raza}
        </p>
      </section>

      {/* Historia */}
      {data.historia && data.historia.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Historia</h3>
          <ul className="list-disc pl-5 space-y-1">
            {data.historia.map((h: Historia, i: number) => (
              <li key={h.id ?? i}>
                <strong>{h.fecha}:</strong> {h.descripcion}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Solicitudes */}
      {data.solicitudes && data.solicitudes.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Solicitudes</h3>
          <ul className="list-disc pl-5 space-y-1">
            {data.solicitudes.map((s: Solicitud, i: number) => (
              <li key={s.id ?? i}>
                <strong>{s.fecha}:</strong> {s.estado}
                {s.adoptante && <span> — {s.adoptante}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
