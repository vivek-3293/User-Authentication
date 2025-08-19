"use client";
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = Cookies.get("accessToken");
        const storedUser = Cookies.get("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, accessToken) => {
        setUser(userData);
        setToken(accessToken);

        // Set Token & User in cookies
        Cookies.set("accessToken", accessToken, { expires: 10 / 1440, sameSite: "Strict" });
        Cookies.set("user", JSON.stringify(userData), { expires: 7, sameSite: "Strict" });
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        // Remove from cookies
        Cookies.remove("accessToken");
        Cookies.remove("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
