// src/services/api.ts
import axios from "axios";

// ========================
// ⚙️ Configuración base
// ========================
const USE_BFF = import.meta.env.VITE_USE_BFF === "true";

const apiMS1 = axios.create({
  baseURL: import.meta.env.VITE_MS1_URL || "http://3.224.109.131:8001/ms1",
});

const apiMS2 = axios.create({
  baseURL: import.meta.env.VITE_MS2_URL || "http://3.224.109.131:8082/ms2",
});

const apiMS3 = axios.create({
  baseURL: import.meta.env.VITE_MS3_URL || "http://3.224.109.131:8003/ms3",
});

const apiMS4 = axios.create({
  baseURL: import.meta.env.VITE_MS4_URL || "http://3.224.109.131:8004/ms4",
});

// --- Utilidades ---
const normalizePaginated = (data: any, params: any) => ({
  items: data.items ?? data.content ?? [],
  total: data.total ?? data.totalElements ?? 0,
  page: params.page ?? 0,
  size: params.size ?? 10,
});

// ================================================================
// 🐾 Mascotas
// ================================================================
export async function listPets(params: any = {}) {
  try {
    if (USE_BFF) {
      console.warn("BFF no expone /pets/petsPag, se usa MS1 directamente");
    }

    const res = await apiMS1.get("/pets/petsPag", { params });
    return normalizePaginated(res.data, params);
  } catch (error) {
    console.error("Error listPets:", error);
    throw error;
  }
}

// ================================================================
// 🧩 Perfil completo
// ================================================================
export async function getPerfilCompleto(id: number | string) {
  try {
    const petId = Number(id);

    if (USE_BFF) {
      const res = await apiMS4.get(`/mascotas/${petId}/perfil_completo`);
      return res.data;
    }

    const pet = (await apiMS1.get(`/pets/${petId}`)).data;
    const histories = (await apiMS3.get(`/histories/pet/${petId}`)).data;

    return { mascota: pet, historia: histories, solicitudes: [] };
  } catch (error) {
    console.error("Error getPerfilCompleto:", error);
    throw error;
  }
}

// ================================================================
// 🐶 Mascotas adoptadas
// ================================================================
export async function listAdoptadas(params: any = {}) {
  try {
    if (USE_BFF) {
      const res = await apiMS4.get("/adoptadas", { params });
      return res.data;
    }

    const res = await apiMS1.get("/pets/petsPag", { params });
    const data =
      res.data.items?.filter((p: any) => p.state === "adopted") ?? [];
    return data;
  } catch (error) {
    console.error("Error listAdoptadas:", error);
    throw error;
  }
}

// ================================================================
// 📋 Solicitudes
// ================================================================
export async function createRequest(body: any) {
  try {
    const res = await apiMS2.post("/requests", body);
    return res.data;
  } catch (error) {
    console.error("Error createRequest:", error);
    throw error;
  }
}

export async function listRequestsByUser(userId: number) {
  try {
    const res = await apiMS2.get(`/${userId}/requests`);
    return res.data;
  } catch (error) {
    console.error("Error listRequestsByUser:", error);
    throw error;
  }
}

export async function getRequestDetail(
  userId: number,
  applicationId: number
) {
  try {
    const res = await apiMS2.get(`/${userId}/requests/${applicationId}`);
    return res.data;
  } catch (error) {
    console.error("Error getRequestDetail:", error);
    throw error;
  }
}

// ================================================================
// 🏠 Centros
// ================================================================
export async function listCenters() {
  try {
    const res = await apiMS1.get("/centers");
    return res.data;
  } catch (error) {
    console.error("Error listCenters:", error);
    throw error;
  }
}
