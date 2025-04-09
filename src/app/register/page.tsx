"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState<any[]>([]);

    // Fetch users on component mount (GET request)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users");
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.users);
                } else {
                    setMessage(data.error);
                }
            } catch (error) {
                setMessage("Error fetching users");
            }
        };
        fetchUsers();
    }, []);

    // Handle form submission (POST request)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Registration successful!");
                setUsername("");
                setEmail("");
                setPassword("");
                // Refresh user list
                const usersResponse = await fetch("/api/users");
                const usersData = await usersResponse.json();
                if (usersResponse.ok) {
                    setUsers(usersData.users);
                }
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage("Error registering user");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            {/* Home Button */}
            <Link href="/">
                <button
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Home
                </button>
            </Link>

            {/* Registration Form */}
            <h2>Đăng ký tài khoản</h2>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", width: "300px", margin: "0 auto" }}
            >
                <input
                    type="text"
                    placeholder="Tên người dùng"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: "10px", padding: "8px" }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        backgroundColor: "#ff4c4c",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                    }}
                >
                    Đăng ký
                </button>
            </form>
            {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
            <p style={{ marginTop: "15px" }}>
                Đã có tài khoản?{" "}
                <a href="/login" style={{ color: "#4c9aff", textDecoration: "none" }}>
                    Đăng nhập
                </a>
            </p>

            {/* Display list of users (for demonstration) */}
            {users.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Danh sách người dùng:</h3>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {users.map((user) => (
                            <li key={user.id}>
                                {user.username} ({user.email})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}