import { NextRequest, NextResponse } from "next/server";
import { addUser, findUserByEmail } from "@/app/lib/users";

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const existingUser = findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        const newUser = addUser({ username, email, password });
        return NextResponse.json(
            { message: "User registered successfully", user: newUser },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}