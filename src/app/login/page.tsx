"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Handle form submission (POST request)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Login successful!");
                setEmail("");
                setPassword("");
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage("Error logging in");
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

            {/* Login Form */}
            <h2>Đăng nhập</h2>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", width: "300px", margin: "0 auto" }}
            >
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
                        backgroundColor: "#4c9aff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                    }}
                >
                    Đăng nhập
                </button>
            </form>
            {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
            <p style={{ marginTop: "15px" }}>
                Chưa có tài khoản?{" "}
                <a href="/register" style={{ color: "#4c9aff", textDecoration: "none" }}>
                    Đăng ký
                </a>
            </p>
        </div>
    );
}