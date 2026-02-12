// app/api/download/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req: Request) {
  try {
    // 1. Get the Architecture Data from the frontend
    const body = await req.json();
    const { architecture } = body;

    if (!architecture) {
      return NextResponse.json({ error: "Missing architecture data" }, { status: 400 });
    }

    // 2. Get the Token from the Browser's Cookie (Server-Side)
    const cookieStore = await cookies();
    // Check for 'token' or 'jwt' (whatever your backend set)
    const tokenCookie = cookieStore.get("token") || cookieStore.get("jwt");

    if (!tokenCookie) {
      return NextResponse.json({ error: "Unauthorized: No session found" }, { status: 401 });
    }

    // 3. Define your External Backend URL
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/generate/download`;

    // 4. Call your Express Backend (Server-to-Server)
    // We forward the cookie manually in the header
    const backendResponse = await axios.post(
      backendUrl, 
      { architecture }, 
      {
        headers: {
          // Forward the cookie exactly as the backend expects it
          "Cookie": `${tokenCookie.name}=${tokenCookie.value}` 
        },
        responseType: "arraybuffer", // Important: Receive as raw binary data
        validateStatus: (status) => status < 500, // Handle 400s manually
      }
    );

    if (backendResponse.status !== 200) {
      return NextResponse.json(
        { error: "Backend download failed" }, 
        { status: backendResponse.status }
      );
    }

    // 5. Return the File to the Browser
    return new Response(backendResponse.data, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="NodeGraph-${Date.now()}.zip"`,
      },
    });

  } catch (error: any) {
    console.error("Proxy Download Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}