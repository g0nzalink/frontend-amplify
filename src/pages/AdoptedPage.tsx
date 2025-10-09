import { useEffect, useState } from "react";
import { listAdoptadas } from "../services/api";
import { Pet } from "../types";
import PetCard from "../components/PetCard";

export default function AdoptedPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAdoptadas({})
      .then((res: any) => {
        // Si viene como array o como objeto con items
        if (Array.isArray(res)) setPets(res);
        else if (res.items) setPets(res.items);
        else setPets([]);
      })
      .catch((err) => {
        console.error("Error al listar adoptadas:", err);
        setPets([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Cargando mascotas adoptadas...</p>;

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Mascotas adoptadas</h2>

      {pets.length === 0 ? (
        <p>No hay mascotas adoptadas en este momento.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {pets.map((p) => (
            <PetCard key={p.id} pet={p} />
          ))}
        </div>
      )}
    </main>
  );
}
