// app/lib/db.ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "animehay_user", // Replace with your MySQL user (e.g., root or animehay_user)
    password: "1234", // Replace with your MySQL password
    database: "animehay",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;