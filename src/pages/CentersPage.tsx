import { useEffect, useState } from "react";
import { listCentersMock } from "../services/mockCenters";

export default function CentersPage() {
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCentersMock()
      .then(setCenters)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Cargando centros...</p>;

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Centros de Adopción</h2>

      {centers.length === 0 ? (
        <p>No hay centros registrados.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((c) => (
            <div
              key={c.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{c.nombre}</h3>
              <p>{c.direccion}</p>
              <p>{c.ciudad}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
