import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequestDetailMock } from "../services/mockRequests";

export default function RequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState<any>(null);

  useEffect(() => {
    if (id) getRequestDetailMock(id).then(setRequest);
  }, [id]);

  if (!request) return <p className="p-8">Cargando detalle...</p>;

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Detalle de solicitud</h2>

      <div className="border rounded-lg p-4 max-w-lg">
        <p>
          <strong>Mascota:</strong> {request.mascota?.nombre}
        </p>
        <p>
          <strong>Estado:</strong> {request.estado}
        </p>
        <p>
          <strong>Comentario:</strong> {request.comentario}
        </p>
        <p>
          <strong>Fecha:</strong> {request.fecha_solicitud}
        </p>
      </div>
    </main>
  );
}
