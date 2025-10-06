// src/components/PetCard.tsx
import React from "react";
import type { Pet } from "../types";
import { useNavigate } from "react-router-dom";

const placeholder = "https://via.placeholder.com/400x300?text=mascota";

export default function PetCard({ pet }: { pet: Pet }) {
  const nav = useNavigate();
  const name = pet.name ?? pet.nombre ?? "Sin nombre";
  const breed = pet.breed ?? pet.raza ?? "Raza desconocida";
  const state = pet.adoption_status?.state ?? pet.estado_adopcion?.estado;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={pet.image_url ?? placeholder}
        alt={name}
        className="w-full h-44 md:h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
        <p className="text-sm text-slate-500">{breed}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {pet.birth_date ? `${new Date().getFullYear() - new Date(pet.birth_date).getFullYear()} años` : "Edad desconocida"}
          </div>

          {state === "adopted" || state === "adoptada" ? (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Adoptada</span>
          ) : (
            <button
              onClick={() => nav(`/pets/${pet.id}`)}
              className="text-sm bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded"
            >
              Ver perfil
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
