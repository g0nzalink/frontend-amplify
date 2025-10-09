// src/pages/PetsPage.tsx
import { useEffect, useState } from "react";
import { listPets } from "../services/api";
import PetCard from "../components/PetCard";
import type { Pet } from "../types";

interface PaginatedPets {
  items: Pet[];
  total: number;
  page: number;
  size: number;
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(9);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [especie, setEspecie] = useState<string>("");
  const [minEdad, setMinEdad] = useState<number | undefined>();
  const [maxEdad, setMaxEdad] = useState<number | undefined>();
  const [centro, setCentro] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const params: Record<string, string | number | undefined> = { page, size };
    if (especie) params.especie = especie;
    if (minEdad !== undefined) params.minEdad = minEdad;
    if (maxEdad !== undefined) params.maxEdad = maxEdad;
    if (centro) params.centro = centro;

    listPets(params)
      .then((res: PaginatedPets) => {
        if (!mounted) return;
        setPets(res.items);
        setTotal(res.total);
        setPage(res.page);
        setSize(res.size);
      })
      .catch((err: unknown) => {
        console.error("listPets error:", err);
        if (mounted) {
          setPets([]);
          setTotal(0);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [page, size, especie, minEdad, maxEdad, centro]);

  const totalPages = Math.max(1, Math.ceil(total / size));

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Mascotas disponibles</h2>

      {/* Filtros */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          placeholder="Especie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Edad min"
          value={minEdad ?? ""}
          onChange={(e) =>
            setMinEdad(e.target.value ? parseInt(e.target.value) : undefined)
          }
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Edad max"
          value={maxEdad ?? ""}
          onChange={(e) =>
            setMaxEdad(e.target.value ? parseInt(e.target.value) : undefined)
          }
          className="border p-2 rounded"
        />
        <input
          placeholder="Centro"
          value={centro}
          onChange={(e) => setCentro(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
        </select>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : pets.length === 0 ? (
        <p>No hay mascotas disponibles</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {pets.map((p: Pet) => (
              <PetCard key={p.id} pet={p} />
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              Página {page} de {totalPages} — total {total}
            </div>
            <div className="space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
