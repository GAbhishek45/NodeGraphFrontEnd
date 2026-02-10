import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // 1. Log the Target URL to ensure it's correct
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ""); 
        const targetUrl = `${baseUrl}/api/auth/login`; 
        console.log("🔥 [PROXY] Attempting to hit:", targetUrl);

        const res = await axios.post(targetUrl, body, {
            withCredentials: true 
        });

        // Success Case
        const nextResponse = NextResponse.json(res.data, { status: 200 });
        if (res.headers['set-cookie']) {
            res.headers['set-cookie'].forEach(c => nextResponse.headers.append('Set-Cookie', c));
        }
        return nextResponse;

    } catch (error: any) {
        console.error("🔥 [PROXY] Error Caught!");

        // CASE A: The Backend responded (4xx, 5xx)
        if (error.response) {
            console.log("   - Status:", error.response.status);
            console.log("   - Data:", JSON.stringify(error.response.data, null, 2));

            // Extract the message safely
            const serverMessage = 
                error.response.data?.message || 
                error.response.data?.error || 
                "Backend error (No message field found)";

            return NextResponse.json(
                { message: serverMessage, debug_data: error.response.data }, 
                { status: error.response.status }
            );
        } 
        
        // CASE B: The Request was made but NO response received (Network Error / Timeout)
        else if (error.request) {
            console.error("   - No response received from Backend. Is it running?");
            console.error("   - Target:", process.env.NEXT_PUBLIC_API_URL);
            return NextResponse.json(
                { message: "Backend is unreachable or timed out." }, 
                { status: 503 }
            );
        } 
        
        // CASE C: Something happened setting up the request
        else {
            console.error("   - Request Setup Error:", error.message);
            return NextResponse.json(
                { message: "Internal Proxy Error", details: error.message }, 
                { status: 500 }
            );
        }
    }
}