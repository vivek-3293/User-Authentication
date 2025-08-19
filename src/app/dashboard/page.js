"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { getAllUsers, getAuthUser, loginUser } from "../api/api";

export default function DashboardPage() {
    const { token, loading } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!loading && !token) {
            router.push("/login");
        }
    }, [token, loading, router]);

    useEffect(() => {
        async function fetchData() {
            if (token) {
                setFetching(true);
                setError(null);
                try {
                    // Fetch admin (authenticated user) info
                    const adminData = await getAuthUser(token);
                    setAdmin(adminData);
                    // Fetch all users
                    const usersData = await getAllUsers(token);
                    console.log(usersData);
                    setUsers(usersData.users || []);
                } catch (err) {
                    setError("Failed to fetch data");
                } finally {
                    setFetching(false);
                }
            }
        }
        fetchData();
    }, [token]);


    if (loading || fetching) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-3">Error: {error}</div>;
    }

    return (
        <div className="container-fluid py-4 px-2 px-md-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <h2 className="text-center mb-4">Welcome to your dashboard!</h2>
                    {admin && (
                        <div className="d-flex justify-content-center flex-column mb-4 p-3 border rounded bg-light">
                            <h2 className="text-center mb-4">Admin Info</h2>
                            <div className="table-responsive">
                                <table className="table table-bordered w-auto m-auto">
                                    <tbody>
                                        <tr><th scope="row">ID</th><td>{admin.id}</td></tr>
                                        <tr><th scope="row">First Name</th><td>{admin.firstName}</td></tr>
                                        <tr><th scope="row">Last Name</th><td>{admin.lastName}</td></tr>
                                        <tr><th scope="row">Email</th><td>{admin.email}</td></tr>
                                        <tr><th scope="row">Username</th><td>{admin.username}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    <h2 className="text-center mb-3">All Users</h2>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">First Name</th>
                                    <th className="text-center">Last Name</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Username</th>
                                    <th className="text-center">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
} 