import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ""); 
        const targetUrl = `${baseUrl}/api/auth/signup`; 

        const res = await axios.post(targetUrl, body, {
            withCredentials: true 
        });

        const nextResponse = NextResponse.json(res.data, { status: 201 });

        // Forward cookies if the backend sets them during signup (optional based on logic)
        const setCookieHeader = res.headers['set-cookie'];
        if (setCookieHeader) {
            setCookieHeader.forEach((cookie) => {
                nextResponse.headers.append('Set-Cookie', cookie);
            });
        }

        return nextResponse;
    } catch (error: any) {
        const status = error.response?.status || 500;
        const serverMessage = error.response?.data?.message || error.response?.data?.error || "Signup failed";
        return NextResponse.json({ message: serverMessage }, { status });
    }
}