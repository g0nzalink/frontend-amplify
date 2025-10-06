import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">¡Bienvenido a Pet Adoption!</h2>
      <p className="mb-6">Encuentra tu nuevo mejor amigo.</p>
      <div className="space-x-4">
        <Link to="/pets" className="bg-blue-500 text-white px-4 py-2 rounded">Ver Mascotas</Link>
        <Link to="/centers" className="bg-green-500 text-white px-4 py-2 rounded">Centros de Adopción</Link>
      </div>
    </main>
  );
}

