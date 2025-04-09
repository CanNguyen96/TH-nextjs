import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail } from "@/app/lib/users";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Find user
        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Login successful", user: { id: user.id, username: user.username, email: user.email } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}