// src/services/api.ts
import axios from "axios";
import {
  listPetsMock,
  getPerfilCompletoMock,
  listAdoptadasMock,
  createRequestMock,
} from "./mockPets";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

// ==========================
// AXIOS INSTANCES (MS1–MS4)
// ==========================
export const apiMS1 = axios.create({
  baseURL: import.meta.env.VITE_API_MS1_URL || "http:/3.224.109.131:8001", // 🐾 MS1 - Mascotas
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10000),
});

export const apiMS2 = axios.create({
  baseURL: import.meta.env.VITE_API_MS2_URL || "http://3.224.109.131:8002", // 📄 MS2 - Solicitudes
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10000),
});

export const apiMS3 = axios.create({
  baseURL: import.meta.env.VITE_API_MS3_URL || "http://3.224.109.131:8003", // 📜 MS3 - Historias / Centros
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10000),
});

export const apiMS4 = axios.create({
  baseURL: import.meta.env.VITE_API_MS4_URL || "http://3.224.109.131:8004", // 🧩 MS4 - BFF / Integrador
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10000),
});

// ====================================
// ENDPOINTS PRINCIPALES
// ====================================

// 🔹 1. Obtener mascotas con paginación (nuevo endpoint)
export const listPets = async (params?: Record<string, any>) => {
  if (USE_MOCKS) {
    const res = await listPetsMock(params);
    if (res?.data?.results) return res.data;
    if (Array.isArray(res)) {
      return {
        results: res,
        page: 1,
        pageSize: res.length,
        total: res.length,
        totalPages: 1,
      };
    }
    return { results: [], page: 1, pageSize: 0, total: 0, totalPages: 0 };
  }

  // 🔸 Si existe BFF (MS4)
  if (import.meta.env.VITE_USE_BFF === "true") {
    const r = await apiMS4.get("/pets/paginated", { params });
    return r.data;
  }

  // 🔸 Si no, llamar directamente al nuevo endpoint paginado del MS1
  const r = await apiMS1.get("/pets/paginated", { params });
  // backend devuelve algo tipo: { results, page, pageSize, total, totalPages }
  return r.data;
};

// 🔹 2. Perfil completo de mascota
export const getPerfilCompleto = async (id: string) => {
  if (USE_MOCKS) {
    const res = await getPerfilCompletoMock(id);
    return res?.data ?? res;
  }

  if (import.meta.env.VITE_USE_BFF === "true") {
    const r = await apiMS4.get(`/mascotas/${id}/perfil_completo`);
    return r.data;
  }

  const pet = (await apiMS1.get(`/pets/${id}`)).data;
  const histories = (await apiMS3.get(`/histories/pet/${id}`)).data;
  const requests = (await apiMS2.get(`/requests/pet/${id}`)).data;

  return { mascota: pet, historia: histories, solicitudes: requests };
};

// 🔹 3. Mascotas adoptadas
export const listAdoptadas = async (params?: Record<string, any>) => {
  if (USE_MOCKS) {
    const res = await listAdoptadasMock();
    return res?.data?.results ?? res ?? [];
  }

  if (import.meta.env.VITE_USE_BFF === "true") {
    const r = await apiMS4.get("/adoptadas", { params });
    return r.data.results ?? r.data;
  }

  const r = await apiMS1.get("/pets", { params: { ...params, state: "adopted" } });
  return r.data.results ?? r.data ?? [];
};

// 🔹 4. Crear solicitud de adopción
export const createRequest = async (body: any) => {
  if (USE_MOCKS) {
    const res = await createRequestMock(body);
    return res?.data ?? res;
  }

  const r = await apiMS2.post("/requests", body);
  return r.data;
};

// 🔹 5. Solicitudes por usuario
export const listRequestsByUser = async (userId: string) => {
  if (USE_MOCKS) {
    return (await import("./mockRequests")).listRequestsMock();
  }
  const r = await apiMS2.get(`/users/${userId}/requests`);
  return r.data;
};

// 🔹 6. Detalle de solicitud
export const getRequestDetail = async (userId: string, applicationId: string) => {
  if (USE_MOCKS) {
    return (await import("./mockRequests")).getRequestDetailMock(applicationId);
  }
  const r = await apiMS2.get(`/users/${userId}/requests/${applicationId}`);
  return r.data;
};

// 🔹 7. Listar centros
export const listCenters = async () => {
  if (USE_MOCKS) {
    return (await import("./mockCenters")).listCentersMock();
  }
  const r = await apiMS1.get("/centers");
  return r.data;
};
