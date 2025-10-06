// src/services/api.ts
import axios from "axios";
import {
  listPetsMock,
  getPerfilCompletoMock,
  listAdoptadasMock,
  createRequestMock,
} from "./mockPets";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

const apiMS1 = axios.create({
  baseURL: import.meta.env.VITE_MS1_URL || "http://localhost:8001", // MS1 - mascotas
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10000),
});
const apiMS4 = axios.create({
  baseURL: import.meta.env.VITE_MS4_URL || "http://localhost:8004", // BFF (si usas)
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10000),
});
const apiMS2 = axios.create({
  baseURL: import.meta.env.VITE_MS2_URL || "http://localhost:8082",
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10000),
});

// params: { especie, minEdad, maxEdad, centro, page, pageSize }
export const listPets = async (params?: Record<string, any>) => {
  if (USE_MOCKS) {
    const res = await listPetsMock(params);
    // mock devuelve { data: { results } } — normalizamos:
    if (res?.data?.results) {
      return { results: res.data.results, page: params?.page ?? 1, pageSize: params?.pageSize ?? res.data.results.length, total: res.data.results.length, totalPages: 1 };
    }
    if (Array.isArray(res)) return { results: res, page: 1, pageSize: res.length, total: res.length, totalPages: 1 };
    return { results: [], page: 1, pageSize: 0, total: 0, totalPages: 0 };
  }

  // Si usas MS4 (BFF que compone datos): lo más común es llamar al BFF
  if (import.meta.env.VITE_USE_BFF === "true") {
    const r = await apiMS4.get("/pets", { params });
    // asumir r.data == { results, page, pageSize, total, totalPages }  
    return r.data;
  }

  // Llamada directa a MS1 (ajustar keys si el backend espera limit/offset)
  // Intentamos enviar page & pageSize; si MS1 necesita offset/limit, el backend debe traducir.
  const r = await apiMS1.get("/pets", { params });
  // normalize:
  if (r?.data?.results) return r.data;
  if (Array.isArray(r?.data)) return { results: r.data, page: params?.page ?? 1, pageSize: r.data.length, total: r.data.length, totalPages: 1 };
  // fallback
  return { results: [], page: 1, pageSize: 0, total: 0, totalPages: 0 };
};

export const getPerfilCompleto = async (id: string) => {
  if (USE_MOCKS) {
    const res = await getPerfilCompletoMock(id);
    return res?.data ?? res;
  }
  if (import.meta.env.VITE_USE_BFF === "true") {
    const r = await apiMS4.get(`/mascotas/${id}/perfil_completo`);
    return r.data;
  }
  // fallback: get pet + histories + requests calling MS1/MS3/MS2 if needed (example)
  const pet = (await apiMS1.get(`/pets/${id}`)).data;
  const histories = (await axios.get(`${import.meta.env.VITE_MS3_URL || 'http://localhost:3003'}/histories/pet/${id}`)).data;
  const requests = (await apiMS2.get(`/${id}/requests`)).data;
  return { mascota: pet, historia: histories, solicitudes: requests };
};

export const listAdoptadas = async (params?: Record<string, any>) => {
  if (USE_MOCKS) {
    const res = await listAdoptadasMock();
    if (res?.data?.results) return res.data.results;
    if (Array.isArray(res)) return res;
    return [];
  }
  // Prefer BFF
  if (import.meta.env.VITE_USE_BFF === "true") {
    const r = await apiMS4.get("/adoptadas", { params });
    return r.data.results ?? r.data;
  }
  // fallback to MS1/MS4 endpoints
  const r = await apiMS1.get("/pets", { params: { ...params, state: "adopted" } });
  return r.data.results ?? r.data ?? [];
};

export const createRequest = async (body: any) => {
  if (USE_MOCKS) {
    const res = await createRequestMock(body);
    return res?.data ?? res;
  }
  const r = await apiMS2.post("/requests", body);
  return r.data;
};


export const listRequestsByUser = async (userId: string) => {
  if (USE_MOCKS) {
    // crear mockRequests.ts y exportar listRequestsMock
    return (await import("./mockRequests")).listRequestsMock();
  }
  const r = await apiMS2.get(`/${userId}/requests`);
  return r.data;
};

export const getRequestDetail = async (userId: string, applicationId: string) => {
  if (USE_MOCKS) {
    return (await import("./mockRequests")).getRequestDetailMock(applicationId);
  }
  const r = await apiMS2.get(`/${userId}/requests/${applicationId}`);
  return r.data;
};

export const listCenters = async () => {
  if (USE_MOCKS) {
    return (await import("./mockCenters")).listCentersMock();
  }
  const r = await apiMS1.get("/centers");
  return r.data;
};

