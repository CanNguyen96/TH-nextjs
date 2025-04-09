import Link from "next/link";

export default function Login() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Đăng nhập</h2>
            <form style={{ display: "flex", flexDirection: "column", width: "300px", margin: "0 auto" }}>
                <input type="email" placeholder="Email" style={{ marginBottom: "10px", padding: "8px" }} />
                <input type="password" placeholder="Mật khẩu" style={{ marginBottom: "10px", padding: "8px" }} />
                <button type="submit" style={{ padding: "10px", backgroundColor: "#4c9aff", color: "white", border: "none", borderRadius: "5px" }}>
                    Đăng nhập
                </button>
            </form>
            <p style={{ marginTop: "15px" }}>
                Chưa có tài khoản? <a href="/register" style={{ color: "#4c9aff", textDecoration: "none" }}>Đăng kí</a>
            </p>
        </div>
    );
}
