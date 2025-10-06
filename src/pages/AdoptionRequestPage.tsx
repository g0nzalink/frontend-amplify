import { useParams } from "react-router-dom";

export default function AdoptionRequestPage() {
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitud de adopción enviada para la mascota ${id}`);
  };

  return (
    <main className="p-8">
      <h2 className="text-xl font-bold mb-4">Solicitud de adopción</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Comentario (opcional)"
          className="border p-2 w-full rounded"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
          Enviar solicitud
        </button>
      </form>
    </main>
  );
}
