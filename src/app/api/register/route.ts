import { NextRequest, NextResponse } from "next/server";
import { addUser, findUserByEmail } from "@/app/lib/users";

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        // Validate input
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check input lengths
        if (username.length > 255 || email.length > 255 || password.length > 255) {
            return NextResponse.json(
                { error: "Input fields must not exceed 255 characters" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Add new user
        const newUser = await addUser({ username, email, password });
        return NextResponse.json(
            { message: "User registered successfully", user: newUser },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error registering user:", error);
        // Provide more specific error messages
        if (error.code === "ER_DUP_ENTRY") {
            return NextResponse.json(
                { error: "User with this email already exists (database error)" },
                { status: 409 }
            );
        }
        if (error.code === "ER_ACCESS_DENIED_ERROR") {
            return NextResponse.json(
                { error: "Database access denied - check credentials" },
                { status: 500 }
            );
        }
        if (error.code === "ER_NO_SUCH_TABLE") {
            return NextResponse.json(
                { error: "Database table 'users' does not exist" },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}