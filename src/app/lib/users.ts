// app/lib/users.ts
import pool from "./db";
import bcrypt from "bcrypt";

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
};

export const addUser = async (user: Omit<User, "id">) => {
    const { username, email, password } = user;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
    );

    // Get the inserted user's ID
    const insertId = (result as any).insertId;
    return { id: insertId, username, email };
};

export const findUserByEmail = async (email: string) => {
    const [rows] = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return (rows as User[])[0] || null;
};

export const getAllUsers = async () => {
    const [rows] = await pool.execute("SELECT id, username, email FROM users");
    return rows as User[];
};