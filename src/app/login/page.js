"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { loginUser, getAuthUser } from "../api/api";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const data = await loginUser({ username, password });
        console.log('login', data);

        if (data.accessToken) {
            // Fetch full user profile to get role
            const userProfile = await getAuthUser(data.accessToken);
            login(userProfile, data.accessToken);
            router.push("/dashboard");
        } else {
            setError("Login failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div>
                <h3 className="text-center text-primary mb-4">Login Form</h3>
                <form onSubmit={handleSubmit}>
                    <input className="form-control mb-4" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                    <input className="form-control mb-4" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <button className="btn btn-primary w-100" type="submit">Login</button>
                    {error && <div className="text-danger mt-2">{error}</div>}
                </form>
            </div>
        </div>
    );
} 