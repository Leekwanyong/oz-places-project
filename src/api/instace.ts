const BASE_URL = "http://localhost:3000";

interface RequestConfig {
    params?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
    method?: string;
    data?: unknown;
    body?: unknown;
}

async function instance(url: string, config: RequestConfig = {}) {
    let finalUrl = `${BASE_URL}${url}`;

    if (config.params) {
        const queryString = new URLSearchParams();
        Object.entries(config.params).forEach(([key, value]) => {
            queryString.append(key, value.toString());
        });
        finalUrl += `?${queryString.toString()}`;
    }

    const headers = {
        "Content-Type": "application/json",
        ...config.headers,
    };

    const options = {
        method: config.method || "GET",
        body: config.body ? JSON.stringify(config.body) : undefined,
        headers,
    };

    console.log("요청 URL:", finalUrl);
    console.log("요청 옵션:", JSON.stringify(options));

    const response = await fetch(finalUrl, options);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export default instance;
