const BASE_URL = "http://localhost:9090/api";

async function request(url, options = {}) {
    const response = await fetch(`${BASE_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro na requisição");
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        return response.json();
    }

    return response.arrayBuffer();
}

export const MedicoService = {
    findAll: (pageable, filtro) => {
        const params = new URLSearchParams();

        params.append("pageable", JSON.stringify(pageable));
        if (filtro) params.append("filtro", filtro);

        return request(`/medico?${params.toString()}`, {
            method: "GET",
        });
    },

    create: (data) => {
        return request("/medico", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
};

export const ProdutoService = {
    findAll: (pageable) => {
        const params = new URLSearchParams();
        params.append("pageable", JSON.stringify(pageable));

        return request(`/produto?${params.toString()}`, {
            method: "GET",
        });
    },

    create: (data) => {
        return request("/produto", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
};

export const VisitaService = {
    findAll: (pageable, filtro) => {
        const params = new URLSearchParams();
        params.append("pageable", JSON.stringify(pageable));
        if (filtro) params.append("filtro", filtro || "");

        return request(`/visita-realizada?${params.toString()}`, {
            method: "GET",
        });
    },

    create: (data) => {
        return request("/visita-realizada", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    exportExcel: async () => {
        const blob = await request("/visita-realizada/excel", {
            method: "GET",
        });

        return new Blob([blob], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
    },
};

export const DashboardService = {
  get: () => {
    return request("/dashboard", {
      method: "GET",
    });
  },
};