// src/services/api.ts
import axios from "axios";
import {
  listPetsMock,
  getPerfilCompletoMock,
  listAdoptadasMock,
  createRequestMock,
} from "./mockPets";

// ===================================
// CONFIGURACIÓN GLOBAL
// ===================================
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";
const USE_BFF = import.meta.env.VITE_USE_BFF === "true";
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT ?? 10000);

// ===================================
// INSTANCIAS AXIOS PARA CADA MS
// ===================================
export const apiMS1 = axios.create({
  baseURL: import.meta.env.VITE_API_MS1_URL || "http://3.224.109.131:8001/ms1",
  timeout: TIMEOUT,
});

export const apiMS2 = axios.create({
  baseURL: import.meta.env.VITE_API_MS2_URL || "http://3.224.109.131:8002/ms2",
  timeout: TIMEOUT,
});

export const apiMS3 = axios.create({
  baseURL: import.meta.env.VITE_API_MS3_URL || "http://3.224.109.131:8003/ms3",
  timeout: TIMEOUT,
});

export const apiMS4 = axios.create({
  baseURL: import.meta.env.VITE_API_MS4_URL || "http://3.224.109.131:8004/ms4",
  timeout: TIMEOUT,
});

// ===================================
// HELPERS
// ===================================
const normalizePaginated = (data: any, params?: any) => {
  if (!data) return { results: [], page: 1, pageSize: 0, total: 0, totalPages: 0 };
  if (data.results)
    return {
      results: data.results,
      page: data.page ?? params?.page ?? 1,
      pageSize: data.pageSize ?? params?.pageSize ?? data.results.length,
      total: data.total ?? data.results.length,
      totalPages: data.totalPages ?? 1,
    };
  if (Array.isArray(data))
    return {
      results: data,
      page: 1,
      pageSize: data.length,
      total: data.length,
      totalPages: 1,
    };
  return { results: [], page: 1, pageSize: 0, total: 0, totalPages: 0 };
};

// ===================================
// ENDPOINTS
// ===================================

// 🐾 1. Listar mascotas (con paginación)
export const listPets = async (params?: Record<string, any>) => {
  try {
    if (USE_MOCKS) return normalizePaginated((await listPetsMock(params))?.data, params);

    if (USE_BFF) {
      const res = await apiMS4.get("/pets/paginated", { params });
      return normalizePaginated(res.data, params);
    }

    // Si no se usa BFF → directo al MS1
    const res = await apiMS1.get("/pets/paginated", { params });
    return normalizePaginated(res.data, params);
  } catch (err) {
    console.error("listPets error:", err);
    return normalizePaginated([], params);
  }
};

// 🧩 2. Perfil completo de una mascota
export const getPerfilCompleto = async (id: string) => {
  try {
    if (USE_MOCKS) return (await getPerfilCompletoMock(id))?.data;

    if (USE_BFF) {
      const res = await apiMS4.get(`/mascotas/${id}/perfil_completo`);
      return res.data;
    }

    const pet = (await apiMS1.get(`/pets/${id}`)).data;
    const histories = (await apiMS3.get(`/histories/pet/${id}`)).data;
    const requests = (await apiMS2.get(`/requests/pet/${id}`)).data;

    return { mascota: pet, historia: histories, solicitudes: requests };
  } catch (err) {
    console.error("getPerfilCompleto error:", err);
    throw err;
  }
};

// 🐶 3. Mascotas adoptadas
export const listAdoptadas = async (params?: Record<string, any>) => {
  try {
    if (USE_MOCKS) return (await listAdoptadasMock())?.data?.results ?? [];

    if (USE_BFF) {
      const res = await apiMS4.get("/adoptadas", { params });
      return res.data.results ?? res.data;
    }

    const res = await apiMS1.get("/pets", { params: { ...params, state: "adopted" } });
    return res.data.results ?? res.data ?? [];
  } catch (err) {
    console.error("listAdoptadas error:", err);
    return [];
  }
};

// 📝 4. Crear solicitud de adopción
export const createRequest = async (body: any) => {
  try {
    if (USE_MOCKS) return (await createRequestMock(body))?.data;

    const res = await apiMS2.post("/requests", body);
    return res.data;
  } catch (err) {
    console.error("createRequest error:", err);
    throw err;
  }
};

// 📋 5. Solicitudes de un usuario
export const listRequestsByUser = async (userId: string) => {
  try {
    if (USE_MOCKS) return (await import("./mockRequests")).listRequestsMock();

    const res = await apiMS2.get(`/users/${userId}/requests`);
    return res.data;
  } catch (err) {
    console.error("listRequestsByUser error:", err);
    return [];
  }
};

// 📄 6. Detalle de solicitud
export const getRequestDetail = async (userId: string, applicationId: string) => {
  try {
    if (USE_MOCKS) return (await import("./mockRequests")).getRequestDetailMock(applicationId);

    const res = await apiMS2.get(`/users/${userId}/requests/${applicationId}`);
    return res.data;
  } catch (err) {
    console.error("getRequestDetail error:", err);
    throw err;
  }
};

// 🏠 7. Centros de adopción
export const listCenters = async () => {
  try {
    if (USE_MOCKS) return (await import("./mockCenters")).listCentersMock();

    const res = await apiMS1.get("/centers");
    return res.data;
  } catch (err) {
    console.error("listCenters error:", err);
    return [];
  }
};
