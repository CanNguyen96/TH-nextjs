import pool from "./db";

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Successfully connected to MySQL database!");
        connection.release();
    } catch (error) {
        console.error("Error connecting to MySQL database:", error);
    }
};

testConnection();