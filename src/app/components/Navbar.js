"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [menuOpen]);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const handleToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <Link className="navbar-brand" href="#">UserAuthApp</Link>
                <button className="navbar-toggler" type="button" onClick={handleToggle} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`custom-navbar-menu${menuOpen ? " open" : ""}`}>
                    <ul className="navbar-nav ms-auto">
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link text-primary" href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link text-primary" href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        </li>
                        {!user && (
                            <li className="nav-item">
                                <Link className="nav-link text-success" href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                            </li>
                        )}
                        {user && (
                            <li className="nav-item">
                                <button className="btn btn-link nav-link text-danger" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
} 