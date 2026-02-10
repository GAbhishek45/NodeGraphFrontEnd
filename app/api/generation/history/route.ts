import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(req: Request) {
  try {
    // 1. Construct the Backend URL
    // Ensure NEXT_PUBLIC_API_URL is defined in your .env (e.g., http://localhost:5000/api)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    const targetUrl = `${baseUrl}/api/generate/history`;

    // 2. Get the Cookie Header from the incoming Next.js request
    // This contains the JWT/Session token your Express backend needs to identify 'req.user'
    const headersList = await headers();
    const cookieHeader = headersList?.get("cookie") || "";

    console.log("Proxying History GET to:", targetUrl);

    // 3. Forward the Request to Express
    const res = await axios.get(targetUrl, {
      headers: {
        Cookie: cookieHeader, // 🔑 CRITICAL: Pass the cookies to the backend
      },
      withCredentials: true,
    });

    

    // 4. Return the Data to the Frontend
    return NextResponse.json(res.data, { status: 200 });

  } catch (error: any) {
    // 5. Standard Error Handling
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch history";

    console.error("History Proxy Error:", message);

    return NextResponse.json({ message }, { status });
  }
}