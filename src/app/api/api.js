const BASE_URL = "https://dummyjson.com";

export async function loginUser({ username, password }) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

export async function getAuthUser(token) {
    try {
        const res = await fetch(`${BASE_URL}/auth/me`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            // credentials: "include", // Removed to fix CORS error
        });

        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return { error: error.message };
    }
}

export async function getAllUsers(token) {
    const res = await fetch(`${BASE_URL}/users`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.json();
}

