import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json(); // Expects { email, otp }
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ""); 
        const targetUrl = `${baseUrl}/api/auth/verifyUser`; 

        // Call the NodeGraph Express backend
        const res = await axios.post(targetUrl, body, {
            withCredentials: true 
        });

        // Create the response with verified user data
        const nextResponse = NextResponse.json(res.data, { status: 200 });

        // IMPORTANT: Capture the cookie from the Express response and set it in Next.js
        const setCookieHeader = res.headers['set-cookie'];
        if (setCookieHeader) {
            setCookieHeader.forEach((cookie) => {
                // This ensures the browser receives the 'jwt' cookie
                nextResponse.headers.append('Set-Cookie', cookie);
            });
        }

        return nextResponse;
    } catch (error: any) {
        const status = error.response?.status || 500;
        const serverMessage = error.response?.data?.error || error.response?.data?.message || "Verification failed";
        return NextResponse.json({ message: serverMessage }, { status });
    }
}