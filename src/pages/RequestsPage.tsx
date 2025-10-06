import { useEffect, useState } from "react";
import { listRequestsMock } from "../services/mockRequests";
import { Link } from "react-router-dom";

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listRequestsMock()
      .then(setRequests)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Cargando solicitudes...</p>;

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Mis solicitudes</h2>

      {requests.length === 0 ? (
        <p>No tienes solicitudes registradas.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold">
                Mascota: {req.mascota?.nombre ?? req.mascota_id}
              </h3>
              <p>Estado: {req.estado}</p>
              <p>Comentario: {req.comentario}</p>
              <Link
                to={`/my-requests/${req.id}`}
                className="text-blue-600 underline mt-2 inline-block"
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
