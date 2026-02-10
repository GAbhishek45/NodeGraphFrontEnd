import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. FIX URL: Ensure we don't have double slashes or double 'api'
        // If env is "http://localhost:5000/api", we just add "/auth/signup"
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ""); // Remove trailing slash if present
        const targetUrl = `${baseUrl}/api/auth/me`;

        console.log("Proxying request to:", targetUrl,); // Debug log

        // 2. Call the Backend
        const res = await axios.get(targetUrl);

        const data = res.data;

        // 2. Create the Next.js Response
        const nextResponse = NextResponse.json(data, { status: 200 });

        // 3. THE FIX: Forward the 'set-cookie' header from Express to the Browser
        // const setCookieHeader = res.headers['set-cookie'];

        // if (setCookieHeader) {
        //     // Axios returns an array of cookies. We need to set them on Next.js response.
        //     setCookieHeader.forEach((cookie) => {
        //         // We simply copy the header value to our response
        //         nextResponse.headers.append('Set-Cookie', cookie);
        //     });
        // }

        return nextResponse;
    } catch (error: any) {
        console.error("Signup Error:", error.response?.data || error.message);

        // 4. FIX 500 ERROR: We MUST return a JSON response even if it fails
        // We pass the actual error status (e.g., 400 for 'User exists') back to the frontend
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Internal Server Error";

        return NextResponse.json({ message }, { status });
    }
}