import AuthService from "./authService.ts";
export default class BaseService {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get<T>(endpoint: string): Promise<T | null> {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Resource not found: ${endpoint}`);
                return null;
            }
            throw new Error(`HTTP-Error: ${response.status} - ${response.statusText}`);
        }

        // Ensure proper type safety when parsing JSON
        const data: T = await response.json();
        return data;
    }

    async post<T>(endpoint: string, jsonData: string): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const jwt = AuthService.getToken();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            body: jsonData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    }

    async put<T>(endpoint: string, jsonData: string): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: jsonData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    }

    async delete(endpoint: string): Promise<void> {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }
}
