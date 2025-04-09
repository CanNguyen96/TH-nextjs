export default function Register() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Đăng ký tài khoản</h2>
            <form style={{ display: "flex", flexDirection: "column", width: "300px", margin: "0 auto" }}>
                <input type="text" placeholder="Tên người dùng" style={{ marginBottom: "10px", padding: "8px" }} />
                <input type="email" placeholder="Email" style={{ marginBottom: "10px", padding: "8px" }} />
                <input type="password" placeholder="Mật khẩu" style={{ marginBottom: "10px", padding: "8px" }} />
                <button type="submit" style={{ padding: "10px", backgroundColor: "#ff4c4c", color: "white", border: "none", borderRadius: "5px" }}>
                    Đăng ký
                </button>
            </form>
            <p style={{ marginTop: "15px" }}>
                Đẵ có tài khoản? <a href="/login" style={{ color: "#4c9aff", textDecoration: "none" }}>Đăng nhập</a>
            </p>
        </div>
    );
}
