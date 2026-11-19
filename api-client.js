/*
 * First Delivery API bridge.
 * This file is intentionally side-effect free until a method is called.
 * Set window.FD_API_BASE_URL before this script to point at the backend.
 */
(() => {
  const config = {
    baseUrl: window.FD_API_BASE_URL || "/api",
    credentials: "include",
    getToken: () => window.FD_ACCESS_TOKEN || ""
  };

  class ApiError extends Error {
    constructor(message, { status = 0, code = "API_ERROR", details = null } = {}) {
      super(message);
      this.name = "ApiError";
      this.status = status;
      this.code = code;
      this.details = details;
    }
  }

  function queryString(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
    });
    const value = query.toString();
    return value ? `?${value}` : "";
  }

  async function request(path, { method = "GET", query, body, headers = {}, signal } = {}) {
    const base = String(config.baseUrl || "").replace(/\/$/, "");
    if (!base) throw new ApiError("Configurez FD_API_BASE_URL avant d'appeler l'API.", { code: "API_NOT_CONFIGURED" });
    const requestHeaders = new Headers({ Accept: "application/json", ...headers });
    const token = config.getToken?.();
    if (token) requestHeaders.set("Authorization", `Bearer ${token}`);

    let requestBody;
    if (body instanceof FormData || body instanceof Blob) {
      requestBody = body;
    } else if (body !== undefined) {
      requestHeaders.set("Content-Type", "application/json");
      requestBody = JSON.stringify(body);
    }

    let response;
    try {
      response = await fetch(`${base}${path}${queryString(query)}`, {
        method,
        headers: requestHeaders,
        body: requestBody,
        credentials: config.credentials,
        signal
      });
    } catch (error) {
      if (error.name === "AbortError") throw error;
      throw new ApiError("Le serveur est injoignable. Vérifiez la connexion puis réessayez.", { code: "NETWORK_ERROR", details: error });
    }

    if (response.status === 204) return null;
    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json") ? await response.json().catch(() => null) : await response.text();
    if (!response.ok) {
      const message = payload?.message || payload?.error || (typeof payload === "string" ? payload : "La demande n'a pas pu être traitée.");
      throw new ApiError(message, { status: response.status, code: payload?.code || "HTTP_ERROR", details: payload?.details || payload?.errors || null });
    }
    return payload?.data ?? payload;
  }

  const resource = (basePath) => ({
    list: (query, options) => request(basePath, { ...options, query }),
    get: (id, options) => request(`${basePath}/${encodeURIComponent(id)}`, options),
    create: (data, options) => request(basePath, { ...options, method: "POST", body: data }),
    update: (id, data, options) => request(`${basePath}/${encodeURIComponent(id)}`, { ...options, method: "PATCH", body: data }),
    remove: (id, options) => request(`${basePath}/${encodeURIComponent(id)}`, { ...options, method: "DELETE" })
  });

  const api = {
    ApiError,
    config,
    configure(options = {}) { Object.assign(config, options); },
    request,
    auth: {
      requestOtp: (phone) => request("/auth/otp/request", { method: "POST", body: { phone } }),
      verifyOtp: (phone, code) => request("/auth/otp/verify", { method: "POST", body: { phone, code } }),
      me: () => request("/auth/me"),
      logout: () => request("/auth/logout", { method: "POST" })
    },
    restaurants: {
      ...resource("/restaurants"),
      products: (restaurantId, query, options) => request(`/restaurants/${encodeURIComponent(restaurantId)}/products`, { ...options, query })
    },
    orders: {
      ...resource("/orders"),
      cancel: (id, reason) => request(`/orders/${encodeURIComponent(id)}/cancel`, { method: "POST", body: { reason } }),
      confirmDelivery: (id, data) => request(`/orders/${encodeURIComponent(id)}/confirm-delivery`, { method: "POST", body: data })
    },
    customer: {
      complaints: (query, options) => request("/me/complaints", { ...options, query }),
      createComplaint: (orderId, data) => request(`/orders/${encodeURIComponent(orderId)}/complaints`, { method: "POST", body: data }),
      createReview: (orderId, data) => request(`/orders/${encodeURIComponent(orderId)}/reviews`, { method: "POST", body: data })
    },
    partner: {
      apply: (data) => request("/partner/applications", { method: "POST", body: data }),
      profile: () => request("/partner/profile"),
      updateProfile: (data) => request("/partner/profile", { method: "PATCH", body: data }),
      orders: (query, options) => request("/partner/orders", { ...options, query }),
      updateOrder: (id, data) => request(`/partner/orders/${encodeURIComponent(id)}`, { method: "PATCH", body: data }),
      openingHours: () => request("/partner/opening-hours"),
      updateOpeningHours: (data) => request("/partner/opening-hours", { method: "PUT", body: data }),
      setAvailability: (data) => request("/partner/availability", { method: "PATCH", body: data })
    },
    courier: {
      apply: (data) => request("/courier/applications", { method: "POST", body: data }),
      missions: (query, options) => request("/courier/missions", { ...options, query }),
      acceptMission: (id) => request(`/courier/missions/${encodeURIComponent(id)}/accept`, { method: "POST" }),
      updateMissionStep: (id, data) => request(`/courier/missions/${encodeURIComponent(id)}/steps`, { method: "POST", body: data }),
      reportIncident: (data) => request("/courier/incidents", { method: "POST", body: data }),
      uploadIncidentEvidence: (incidentId, file) => { const form = new FormData(); form.append("file", file); return request(`/courier/incidents/${encodeURIComponent(incidentId)}/evidence`, { method: "POST", body: form }); },
      cashSummary: () => request("/courier/cash/summary"),
      submitDeposit: (data) => request("/courier/cash/deposits", { method: "POST", body: data })
    },
    manager: {
      dashboard: (query, options) => request("/admin/dashboard", { ...options, query }),
      dispatch: (query, options) => request("/admin/dispatch", { ...options, query }),
      applications: (query, options) => request("/admin/applications", { ...options, query }),
      reviewApplication: (id, data) => request(`/admin/applications/${encodeURIComponent(id)}/review`, { method: "POST", body: data }),
      complaints: (query, options) => request("/admin/complaints", { ...options, query }),
      resolveComplaint: (id, data) => request(`/admin/complaints/${encodeURIComponent(id)}/resolution`, { method: "POST", body: data }),
      incidents: (query, options) => request("/admin/incidents", { ...options, query }),
      resolveIncident: (id, data) => request(`/admin/incidents/${encodeURIComponent(id)}/resolution`, { method: "POST", body: data }),
      zones: (query, options) => request("/admin/zones", { ...options, query }),
      updateZone: (id, data) => request(`/admin/zones/${encodeURIComponent(id)}`, { method: "PATCH", body: data }),
      financeSummary: (query, options) => request("/admin/finance/summary", { ...options, query }),
      recordDeposit: (data) => request("/admin/finance/deposits", { method: "POST", body: data })
    }
  };

  window.FirstDeliveryAPI = api;
})();
