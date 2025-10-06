import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between p-4 bg-gray-100 shadow-md">
      <h1 className="text-xl font-bold">🐾 Pet Adoption</h1>
      <nav className="space-x-4">
        <Link to="/">Inicio</Link>
        <Link to="/pets">Mascotas</Link>
        <Link to="/centers">Centros</Link>
        <Link to="/my-requests">Mis solicitudes</Link>
        <Link to="/adopted">Adoptadas</Link>
      </nav>
    </header>
  );
}
