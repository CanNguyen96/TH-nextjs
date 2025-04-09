import { NextResponse } from "next/server";
import { getAllUsers } from "@/app/lib/users";

export async function GET() {
    try {
        const users = getAllUsers();
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}